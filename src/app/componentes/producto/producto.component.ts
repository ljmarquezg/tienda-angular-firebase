import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/modelos/Producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Observable } from 'rxjs';


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

  constructor(private productoService: ProductoService) {
  }

  ngOnInit() {
    console.log('openingProducts');
    this.getProducts();
  }

  getProducts(): Producto[]{
    const listaProducto = this.productoService.obtenerProductos();
    listaProducto.subscribe(productos => {
      this.listaProductos = productos;
    });
    return this.listaProductos;
  }
  enviarAListaCarrito(producto: Producto): void {
    this.enviarACarritoEmit.emit(producto);
  }
}
