import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Carrito } from 'src/app/modelos/Carrito';
import { Producto } from 'src/app/modelos/Producto';
import { CartService } from 'src/app/services/cart/cart.service';
import { TiendaService } from 'src/app/services/tienda/tienda.service';
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

  constructor(private cartService: CartService, private tiendaService: TiendaService) {
  }

  ngOnInit() {
    // //this.productosEnCarrito = this.cartService.inicializarContador();
    // const getCart = this.tiendaService.obtenerCart();
    // getCart.subscribe(cart => {
    //   console.log(cart);
    //   this.productosEnCarrito = cart;
    // });
  }

  // agregarACarrito(nuevoProducto: Producto): Carrito {
  //   const observable = this.cartService.agregarAListaCarrito(nuevoProducto, 'sumar');
  //   observable.subscribe(listado => {
  //     this.productosEnCarrito = listado;
  //   });
  //   return this.productosEnCarrito;
  // }

  agregarACarrito(nuevoProducto: Producto): Carrito {
    console.log('pressed');
    const observable = this.cartService.addToCart(nuevoProducto, 'sumar');
    observable.subscribe(listado => {
      this.productosEnCarrito = listado;
      console.log('Agregar a carrito', this.productosEnCarrito);
    });
    return this.productosEnCarrito;
  }
}
