import { BaseEntity } from './../../shared';

export class Alumno implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public semestre?: number,
        public materias?: BaseEntity[],
    ) {
    }
}
