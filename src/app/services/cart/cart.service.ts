import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Producto } from 'src/app/modelos/Producto';
import { Carrito } from 'src/app/modelos/Carrito';
import { Item } from 'src/app/modelos/Items';
import { Router } from '@angular/router';
import { ProductoService } from '../producto/producto.service';
import { match } from 'minimatch';
import { Tipo } from 'src/app/modelos/tipo';


@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartCollection: AngularFirestoreCollection<Carrito>;
    private cart: Observable<Carrito[]>;
    private cartId: any;
    private actualCart: Carrito;
    // Productos
    listaProductos: Producto[] = [];
    // Carrito
    productosEnCarrito: Carrito;
    listaItemsCarrito: Item[] = [];
    newCart: Carrito = {
        id: '',
        listaCarrito: [],
        contador: 0,
        contadorTotal: 0,
        totalCarrito: 0,
        status: 'active'
    }

    constructor(
        private db: AngularFirestore,
        private authService: AuthService,
        private productService: ProductoService,
        private router: Router
    ) {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/']);
        }
        this.getCartCollection();
    }

    getCartCollection(): void {
        this.cartCollection = this.db.collection<Carrito>('carrito');
        this.cart = this.cartCollection.snapshotChanges().pipe(
            map(items => {
                return items.map(val => {
                    const data = val.payload.doc.data();
                    const id = val.payload.doc.id;
                    if (val.payload.doc.data().id === this.authService.getUser().uid) {
                        this.cartId = id;
                        this.actualCart = data;
                        this.actualCart.id = this.authService.getUser().uid;
                    }
                    if (!this.actualCart) {
                        this.createCart();
                    }
                    this.recalcularTotales();
                    return { id, ...data };
                });
            })
        );
    }
    createCart() {
        if (this.actualCart === undefined || this.actualCart.status !== 'active') {
            this.newCart.id = this.authService.getUser().uid;
            this.cartCollection.add(this.newCart);
        }
    }
    inicializarContador(): Carrito {
        this.actualCart.contador = 0;
        this.actualCart.contadorTotal = 0;
        this.actualCart.totalCarrito = 0;
        return this.actualCart;
    }

    getCartId(): any {
        return this.cartId;
    }

    getCartList(): Observable<Carrito[]> {
        return this.cart;
    }

    redondear(valor: number): number {
        return Math.ceil(valor * 100) / 100;
    }

    createNewProduct(item: Producto) {
        const nuevoProducto = new Item(item.id, item.nombre, item.peso, item.tipo, Number(item.precio), (item.stock - 1), item.peso, 1, item.img, item.precio, 1);
        item.stock -= 1;
        this.actualCart.listaCarrito.push(nuevoProducto);
        this.cartCollection.doc<Carrito>(this.cartId).update(JSON.parse(JSON.stringify(this.actualCart)));
    }

    addToCart(item: Producto, tipo: string): Observable<Carrito> {
        const observable = Observable.create(observer => {
            let found = false;
            this.listaItemsCarrito = this.actualCart.listaCarrito;
            if (!this.listaItemsCarrito.length) {
                this.createNewProduct(item);
            } else {
                const operacion = tipo;
                this.listaItemsCarrito.forEach((productoActual, index) => {
                    if (productoActual.id === item.id && !found) {
                        operacion === 'sumar' ? (productoActual.cantidad += 1, item.stock-- , productoActual.stock = item.stock) :
                            (productoActual.cantidad-- , item.stock++ , productoActual.stock = item.stock);
                        this.recalcularPeso(productoActual, item);
                        productoActual.itemSubTotal = Number(productoActual.cantidad * productoActual.precio);
                        productoActual.itemTotal = Number((productoActual.itemSubTotal * 1.12));
                        this.actualCart.listaCarrito[index] = productoActual;
                        found = true;
                        this.productService.productosCollection.doc<Producto>(item.id.toString()).update(item);
                        this.cartCollection.doc<Carrito>(this.cartId).update(this.actualCart);
                    }
                });
                if (!found) {
                    this.createNewProduct(item);
                }
            }
            this.actualCart.listaCarrito = this.listaItemsCarrito;
            this.recalcularTotales();
            observer.next(this.actualCart);
            observer.complete();
        });
        return observable;
    }

    eliminarDelCarrito(item: Item): void {
        const allProducts = this.productService.obtenerProductos().subscribe( producto => {
            this.listaProductos = producto;
        });
    
        if (this.actualCart.listaCarrito.indexOf(item) !== -1) {
            this.actualCart.listaCarrito.splice(this.listaItemsCarrito.indexOf(item), 1);
            this.cartCollection.doc<Carrito>(this.cartId).update(this.actualCart);
        } else {
            alert('Error al encontrar el producto');
        }
        console.log(this.listaProductos);
        this.listaProductos.map((productoActual, index) => {
            if (item.id === productoActual.id) {
                console.log(item.id);
                this.listaProductos[index].stock += item.cantidad;
                const matchProduct: Producto = {
                    id: item.id,
                    nombre: item.nombre,
                    peso: item.peso,
                    img: item.img,
                    precio: item.precio,
                    tipo: item.tipo,
                    stock: this.listaProductos[index].stock += item.stock
                };
                console.log(matchProduct);
                this.productService.productosCollection.doc<Producto>(matchProduct.id.toString()).update(matchProduct);
            }
        });
        this.recalcularTotales();
    }

    modificarItemCarrito(producto: Item, tipo: string): void {
        this.listaItemsCarrito = this.actualCart.listaCarrito;
        this.listaItemsCarrito.map((item) => {
            if (item.id === producto.id) {
                this.listaItemsCarrito.forEach((productoActual, index) => {
                    if (productoActual.id === item.id) {
                        tipo === 'sumar' ? (productoActual.cantidad++ , item.stock--) :
                            (productoActual.cantidad-- , item.stock++);
                        productoActual.itemSubTotal = Number(productoActual.cantidad * producto.precio);
                        productoActual.itemTotal = Number((producto.itemSubTotal * 1.12));
                        this.actualCart.listaCarrito[index] = productoActual;
                    }
                });

                if (item.cantidad <= 0) {
                    this.eliminarDelCarrito(item);
                }

                const matchProduct: Producto = {
                    id: item.id,
                    nombre: item.nombre,
                    peso: item.peso,
                    img: item.img,
                    precio: item.precio,
                    tipo: item.tipo,
                    stock: item.stock
                };
                this.productService.productosCollection.doc<Producto>(matchProduct.id.toString()).update(matchProduct);
            }
        });

        this.listaProductos.map((item, index) => {
            if (producto.id === item.id) {
                tipo === 'sumar' ? this.listaProductos[index].stock-- : this.listaProductos[index].stock++;
                this.recalcularPeso(producto, item);
            }
        });

        this.recalcularTotales();
        this.cartCollection.doc<Carrito>(this.cartId).update(this.actualCart);
    }

    calcularCatidad(): number {
        let cantidad = 0;
        this.actualCart.listaCarrito.forEach(item => {
            cantidad += item.cantidad;
        });
        return cantidad;
    }

    calcularTotal(): number {
        let sum = 0;
        this.actualCart.listaCarrito.forEach(itemDetail => {
            sum += Number(itemDetail.itemTotal);
        });
        return sum;
    }

    recalcularPeso(productoActual: Item, producto: Producto): void {
        productoActual.peso =
            Math.round((productoActual.cantidad * Number(producto.peso))) > 1000 ?
                this.redondear((productoActual.cantidad * Number(producto.peso))) :
                this.redondear((productoActual.cantidad * Number(producto.peso)));
    }
    recalcularTotales() {
        this.actualCart.contador = new Set(this.actualCart.listaCarrito).size;
        this.actualCart.totalCarrito = this.calcularTotal();
        this.actualCart.contadorTotal = this.calcularCatidad();
    }

    getCartData(): Observable<Carrito> {
        const observable = Observable.create(observer => {
            observer.next(this.productosEnCarrito);
            observer.complete();
        });
        return observable;
    }
};