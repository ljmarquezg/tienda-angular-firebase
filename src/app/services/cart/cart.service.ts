import { Injectable } from '@angular/core';
import { Producto } from 'src/app/modelos/Producto';
import { Carrito } from 'src/app/modelos/Carrito';
import { Item } from 'src/app/modelos/Items';
import { Observable, of } from 'rxjs';
import { Tipo } from 'src/app/modelos/tipo';
import { nextTick } from 'q';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // Productos
    listaProductos: Producto[] = [];
    // Carrito
    productosEnCarrito: Carrito = new Carrito();
    listaItemsCarrito: Item[] = [];

    constructor() { }

    inicializarContador(): Carrito {
        this.productosEnCarrito.contador = 0;
        this.productosEnCarrito.contadorTotal = 0;
        this.productosEnCarrito.totalCarrito = 0;
        return this.productosEnCarrito;
    }
    generarProductos() {
        this.listaProductos.push(new Producto(0, 'Aguacate', 250, Tipo.Fruta, 3, 100));
        this.listaProductos.push(new Producto(1, 'Manzana', 35, Tipo.Fruta, 2, 300));
        this.listaProductos.push(new Producto(2, 'Zanahoria', 120, Tipo.Verdura, 1, 1000));
        this.listaProductos.push(new Producto(3, 'Pimenton', 80, Tipo.Verdura, 3.5, 250));
        this.listaProductos.push(new Producto(4, 'Sandia', 180, Tipo.Fruta, 5, 80));
        this.listaProductos.push(new Producto(5, 'Banana', 100, Tipo.Fruta, 2.5, 400));
        this.listaProductos.push(new Producto(6, 'Cebolla', 80, Tipo.Verdura, 1.25, 120));
        this.listaProductos.push(new Producto(7, 'Boniato', 80, Tipo.Verdura, 4, 500));
    }

    obtenerProuctos(): Observable<Producto[]> {
        const observable = Observable.create(observer => {
            if (this.listaProductos.length === 0) {
                this.generarProductos();
            }
            observer.next(this.listaProductos);
            observer.complete();
        });
        console.log('Observable', observable);
        return observable;
    }

    getListaCarrito(): Observable<Carrito> {
        const observable = Observable.create(observer => {
            observer.next(this.productosEnCarrito);
            observer.complete();
        })
        return observable;
    }

    redondear(valor: number): number {
        return Math.ceil(valor * 100) / 100;
    };

    createNewProduct(item: Producto) {
        const nuevoProducto = new Item(item.id, item.nombre,
            item.peso, item.tipo, Number(item.precio), (item.stock - 1), item.peso, 1, item.precio, 1);
        item.stock -= 1;
        this.listaItemsCarrito.push(nuevoProducto);
    }

    agregarAListaCarrito(item: Producto, tipo: string): Observable<Carrito> {
        const observable = Observable.create(observer => {
            if (!this.listaItemsCarrito.length) {
                this.createNewProduct(item);
            } else {
                let found = false;
                const operacion = tipo;
                this.listaItemsCarrito.forEach((productoActual, index) => {
                    if (productoActual.id === item.id && !found) {
                        operacion === 'sumar' ? (productoActual.cantidad += 1, item.stock-- , productoActual.stock = item.stock) :
                            (productoActual.cantidad-- , item.stock++ , productoActual.stock = item.stock);
                        this.recalcularPeso(productoActual, item);
                        productoActual.itemSubTotal = Number(productoActual.cantidad * productoActual.precio);
                        productoActual.itemTotal = Number((productoActual.itemSubTotal * 1.12));
                        this.listaItemsCarrito[index] = productoActual;
                        found = true;
                    }
                });

                if (!found) {
                    this.createNewProduct(item);
                }
            }

            this.productosEnCarrito.listaCarrito = this.listaItemsCarrito;
            this.recalcularTotales();
            observer.next(this.productosEnCarrito);
            observer.complete();
        });
        return observable;
    }

    eliminarDelCarrito(producto: Item): void {
        console.log(producto);
        if (this.listaItemsCarrito.indexOf(producto) !== -1) {
            this.listaItemsCarrito.splice(this.listaItemsCarrito.indexOf(producto), 1);
        } else {
            alert('Error al encontrar el producto');
        }

        this.listaProductos.map((productoActual, index) => {
            if (producto.id === productoActual.id) {
                this.listaProductos[index].stock += producto.cantidad;
            }
        });
        this.recalcularTotales();
    }

    modificarItemCarrito(producto: Item, tipo: string): void {
        let matchProduct: Item = null;
        this.listaItemsCarrito.map((item) => {
            if (item.id === producto.id) {
                matchProduct = item;
                this.listaItemsCarrito.forEach((productoActual, index) => {
                    if (productoActual.id === item.id) {
                        tipo === 'sumar' ? (productoActual.cantidad++ , item.stock--) :
                            (productoActual.cantidad-- , item.stock++);
                        productoActual.itemSubTotal = Number(productoActual.cantidad * producto.precio);
                        productoActual.itemTotal = Number((producto.itemSubTotal * 1.12));
                        this.listaItemsCarrito[index] = productoActual;
                    }
                });

                if (item.cantidad <= 0) {
                    this.eliminarDelCarrito(item);
                }
            }
        });

        this.listaProductos.map((item, index) => {
            if (producto.id === item.id) {
                tipo === 'sumar' ? this.listaProductos[index].stock-- : this.listaProductos[index].stock++;
                this.recalcularPeso(producto, item);
            }
        });

        this.recalcularTotales();
    }

    calcularCatidad(): number {
        let cantidad = 0;
        this.listaItemsCarrito.forEach(item => {
            cantidad += item.cantidad;
        });
        return cantidad;
    }

    calcularTotal(): number {
        let sum = 0;
        this.listaItemsCarrito.forEach(itemDetail => {
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
        this.productosEnCarrito.contador = new Set(this.listaItemsCarrito).size;
        this.productosEnCarrito.totalCarrito = this.calcularTotal();
        this.productosEnCarrito.contadorTotal = this.calcularCatidad();
        sessionStorage.setItem('cart', JSON.stringify(this.productosEnCarrito));
    }

    getCartData(): Observable<Carrito> {
        const observable = Observable.create(observer => {
            observer.next(this.productosEnCarrito);
            observer.complete();
        });
        return observable;
    }

    checkSessionCart(): Carrito {
        if (sessionStorage.cart) {
            //const listado: Carrito;
            this.productosEnCarrito = JSON.parse(sessionStorage.cart);
            return this.productosEnCarrito;
        }
    }

}
;