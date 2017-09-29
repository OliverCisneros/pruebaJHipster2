import { BaseEntity } from './../../shared';

export class Profesor implements BaseEntity {
    constructor(
        public id?: number,
        public nombreProfe?: string,
    ) {
    }
}
