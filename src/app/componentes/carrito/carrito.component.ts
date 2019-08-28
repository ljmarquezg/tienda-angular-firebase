import { Component, OnInit, Input } from '@angular/core';
import { Carrito } from 'src/app/modelos/Carrito';
import { Item } from 'src/app/modelos/Items';
import { CartService } from 'src/app/services/cart/cart.service'
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  contador: number;
  carrito: Carrito;
  totalCarrito: number;
  contadorTotal: number;
  productosTotales: number;
  productosEnCarrito: Carrito;
  cantidadProductosEnCarrito: number;
  productoCarrito: Item[] = [];


  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.getCart();
    this.authService.getUser();
    this.getCart();
  }

  getCart() {
    this.contador = 0;
    this.cantidadProductosEnCarrito = 0;
    this.productosTotales = 0;
    this.totalCarrito = 0;
    this.contadorTotal = 0;
    this.cartService.getCartCollection();
    const listado = this.cartService.getCartList();
    listado.subscribe(listaProductos => {
      const cart = listaProductos.filter(carrito => {
        if (carrito.id === this.authService.getUser().uid) {
          return carrito;
        }
      });
      this.carrito = cart[0];
      this.contador = cart[0].contador;
      this.contadorTotal = cart[0].contadorTotal;
      this.totalCarrito = cart[0].totalCarrito;
    });
  }

  eliminarProductoDelCarrito(item: Item): void {
    this.cartService.eliminarDelCarrito(item);
  }

  modificarItemCarrito(item: Item, tipo: string) {
    this.cartService.modificarItemCarrito(item, tipo);
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }

}
