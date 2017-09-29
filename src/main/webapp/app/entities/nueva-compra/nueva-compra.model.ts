import { BaseEntity } from './../../shared';

export class NuevaCompra implements BaseEntity {
    constructor(
        public id?: number,
        public idventa?: number,
        public cantidadComprar?: number,
        public fechaTransaccion?: any,
        public persona?: BaseEntity,
        public producto?: BaseEntity,
    ) {
    }
}
