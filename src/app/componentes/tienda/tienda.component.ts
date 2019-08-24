import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Carrito } from '../../modelos/Carrito';
import { Producto } from 'src/app/modelos/Producto';
import { CartService } from 'src/app/services/cart/cart.service';
import { Item } from 'src/app/modelos/Items';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  /*contador: number;
  productosTotales: number;
  totalCarrito: number;*/
  productosEnCarrito: Carrito;
  listaProductos: Item[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.productosEnCarrito = this.cartService.inicializarContador();
  }

  agregarACarrito(nuevoProducto: Producto): Carrito {
    const observable = this.cartService.agregarAListaCarrito(nuevoProducto, 'sumar');
    observable.subscribe( listado => {
      this.productosEnCarrito = listado;
    });
    return this.productosEnCarrito;
  }
}
