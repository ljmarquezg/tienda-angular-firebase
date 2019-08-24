import { Tipo } from './tipo';
export class Producto {
    id: number;
    nombre: string;
    peso: number;
    precio: number;
    tipo: Tipo;
    stock: number;

    constructor(id: number, nombre: string, peso: number, tipo: Tipo, precio: number, stock: number) {
        this.id = id;
        this.nombre = nombre;
        this.peso = peso;
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
    }
}