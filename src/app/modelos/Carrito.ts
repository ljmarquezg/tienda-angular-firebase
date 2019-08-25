import { Item } from 'src/app/modelos/Items';

export interface Carrito {
    id: any;
    listaCarrito: Item[];
    contador: number;
    contadorTotal: number;
    totalCarrito: number;
    status: string;
}
