import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/modelos/Producto';
import { Carrito } from 'src/app/modelos/Carrito';
import { Item } from 'src/app/modelos/Items';
import { Tipo } from 'src/app/modelos/tipo';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productosCollection: AngularFirestoreCollection<Producto>;

  private productos: Observable<Producto[]>;

  constructor(private db: AngularFirestore) {
    this.productosCollection = this.db.collection<Producto>('producto');
    this.productos = this.productosCollection.snapshotChanges().pipe(
      map(product => {
        return product.map(val => {
          const data = val.payload.doc.data();
          const id = val.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  generarProductos() {
    //TODO: initialize firebase database
  }
  obtenerProductos(): Observable<Producto[]> {
    return this.productos;
  }
}
