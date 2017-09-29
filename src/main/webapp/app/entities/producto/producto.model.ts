import { BaseEntity } from './../../shared';

export class Producto implements BaseEntity {
    constructor(
        public id?: number,
        public idProducto?: number,
        public nombreProducto?: string,
        public precioVenta?: number,
        public cantidad?: number,
        public nuevaCompras?: BaseEntity[],
    ) {
    }
}
