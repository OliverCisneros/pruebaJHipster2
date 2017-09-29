import { BaseEntity } from './../../shared';

export class Persona implements BaseEntity {
    constructor(
        public id?: number,
        public idPersona?: number,
        public nombre?: string,
        public apaterno?: string,
        public amaterno?: string,
        public edad?: number,
        public nuevaCompras?: BaseEntity[],
    ) {
    }
}
