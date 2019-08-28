import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/modelos/Producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { Carrito } from 'src/app/modelos/Carrito';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  // @Output() enviarACarritoEmit = new EventEmitter<Producto>();

  public loading: boolean;
  public disableAddToCart: boolean = false;
  public listaProductos: Producto[] = [];
  public productosEnCarrito: Carrito;
  // listaProductos: Item[] = [];

  constructor(private productoService: ProductoService, private cartService: CartService) {
  }

  localProducts: Producto[] = [];

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): Producto[] {
    const listaProducto = this.productoService.obtenerProductos();
    listaProducto.subscribe(productos => {
      this.listaProductos = productos;
      this.localProducts = productos;
    });
    return this.listaProductos;
  }

  enviarAListaCarrito(nuevoProducto: Producto): Carrito {
    const observable = this.cartService.addToCart(nuevoProducto, 'sumar');
    observable.subscribe(listado => {
      this.productosEnCarrito = listado;
    });
    return this.productosEnCarrito;
  }

  get listadoProductos(): Producto[] {
    return this.listaProductos;
  }
  // enviarAListaCarrito(producto: Producto): void {
  //   this.enviarACarritoEmit.emit(producto);
  // }
}
