import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Carrito } from 'src/app/modelos/Carrito';
import { Item } from 'src/app/modelos/Items';
import { Producto } from 'src/app/modelos/Producto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  productosEnCarrito: Carrito;
  listaProductos: Producto[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    const checkCarrito: Carrito = sessionStorage.cart;
    if (checkCarrito && !this.productosEnCarrito) {
      const listaProducto = this.cartService.obtenerProuctos();
      listaProducto.subscribe(productos => {
        this.listaProductos = productos;
      });

      console.log(this.listaProductos);
      this.productosEnCarrito = this.cartService.checkSessionCart();
      console.log(this.productosEnCarrito);
      return;
    }

    const listado = this.cartService.getCartData();
    listado.subscribe(listaProductos => {
      this.productosEnCarrito = listaProductos;
    });
  }

  eliminarProductoDelCarrito(producto: Item): void {
    console.log(producto);
    this.cartService.eliminarDelCarrito(producto);
  }

  modificarItemCarrito(item: Item, tipo: string) {
    this.cartService.modificarItemCarrito(item, tipo);
  }
}
