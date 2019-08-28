import { Tipo } from './tipo';
export class Producto {
    id: any;
    nombre: string;
    peso: number;
    precio: number;
    tipo: Tipo;
    stock: number;
    img: string;

    constructor(id: number, nombre: string, peso: number, tipo: Tipo, precio: number, stock: number, img: string) {
        this.id = id;
        this.nombre = nombre;
        this.peso = peso;
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
    }
}