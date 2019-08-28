import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Carrito } from 'src/app/modelos/Carrito';
import { Item } from 'src/app/modelos/Items';
import { Producto } from 'src/app/modelos/Producto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  carritoActual: Carrito;
  productosEnCarrito: Carrito;
  listaProductos: Item[] = [];
  totalItems: number;
  contador: number;
  totalCarrito: number;

  constructor(private cartService: CartService, private productService: ProductoService) { }

  ngOnInit() {
    this.getCart();
    this.listaProductos = [];
    this.totalItems = 0;
    this.contador = 0;
    this.totalCarrito = 0;
  }

  eliminarProductoDelCarrito(producto: Item): void {
    this.cartService.eliminarDelCarrito(producto);
  }

  modificarItemCarrito(item: Item, tipo: string) {
    this.cartService.modificarItemCarrito(item, tipo);
  }

  getCart(): Carrito {
    this.cartService.getCartCollection();
    this.cartService.getCartList().subscribe(carrito => {
      this.carritoActual = carrito[0];
      this.listaProductos = carrito[0].listaCarrito;
      this.contador = carrito[0].contador;
      this.totalItems = carrito[0].totalCarrito;
    });
    return this.carritoActual;
  }
}
