import { Tipo } from './tipo';
import { Producto } from './Producto';

export class Item extends Producto {
    id: any;
    nombre: string;
    peso: number;
    tipo: Tipo;
    precio: number;
    stock: number;
    img: string;
    pesoK: number;
    cantidad: number;
    itemSubTotal: number;
    itemTotal: number;

    constructor(
        id: any,
        nombre: string,
        peso: number,
        tipo: Tipo,
        precio: number,
        stock: number,
        pesoK: number,
        cantidad: number,
        img: string,
        itemSubTotal: number,
        itemTotal: number) {
        super(id, nombre, peso, tipo, precio, stock, img);
        this.pesoK = pesoK;
        this.cantidad = cantidad;
        this.itemSubTotal = itemSubTotal;
        this.itemTotal = itemTotal;
    }
}