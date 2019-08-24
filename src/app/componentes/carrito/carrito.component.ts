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
  @Input() contador: number;
  @Input() cantidadProductosEnCarrito: number;
  @Input() productosTotales: number;
  @Input() totalCarrito: number;
  @Input() productosEnCarrito: Carrito;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {

  }

  listaCarrito: Carrito;
  productoCarrito: Item[] = [];

  ngOnInit() {
    this.authService.getUser();
    this.getProductosEnCarrito();
    this.contador = 0;
    this.cantidadProductosEnCarrito = 0;
    this.productosTotales = 0;
    this.totalCarrito = 0;
  }

  getProductosEnCarrito() {
    const listaProducto = this.cartService.getListaCarrito();
    listaProducto.subscribe(productos => {
      this.listaCarrito = productos;
    });
  }

  eliminarProductoDelCarrito(producto: Item): void {
    this.cartService.eliminarDelCarrito(producto);
  }

  modificarItemCarrito(item: Item, tipo: string) {
    this.cartService.modificarItemCarrito(item, tipo);
  }

  logout() {
    this.authService.logout();
  }

  irACheckout() {
    this.router.navigate(['/checkout']);
  }
}
