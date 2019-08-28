import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Carrito } from 'src/app/modelos/Carrito';
import { Producto } from 'src/app/modelos/Producto';
import { Item } from 'src/app/modelos/Items';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  productosEnCarrito: Carrito;
  listaProductos: Item[] = [];

  constructor(private cartService: CartService, private productService: ProductoService) {
  }

  ngOnInit() {

  }

  // agregarACarrito(nuevoProducto: Producto): Carrito {
  //   const observable = this.cartService.addToCart(nuevoProducto, 'sumar');
  //   observable.subscribe(listado => {
  //     this.productosEnCarrito = listado;
  //   });
  //   return this.productosEnCarrito;
  // }
}
