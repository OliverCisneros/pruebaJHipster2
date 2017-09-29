import { BaseEntity } from './../../shared';

export class Materia implements BaseEntity {
    constructor(
        public id?: number,
        public nombreMateria?: string,
        public alumno?: BaseEntity,
        public profesor?: BaseEntity,
    ) {
    }
}
