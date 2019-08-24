import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/modelos/Producto';
import { Tipo } from 'src/app/modelos/Tipo';
import { CartService } from 'src/app/services/cart/cart.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Output() enviarACarritoEmit = new EventEmitter<Producto>();

  loading: boolean;
  disableAddToCart: boolean = false;

  listaProductos: Producto[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.loading = true;
    const listaProducto = this.cartService.obtenerProuctos();
    listaProducto.subscribe(productos => {
      this.listaProductos = productos;
      this.loading = false;
    });
  }

  enviarAListaCarrito(producto: Producto): void {
    this.enviarACarritoEmit.emit(producto);
  }
}
