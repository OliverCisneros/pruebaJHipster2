import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PruebaJHipster2PersonModule } from './person/person.module';
import { PruebaJHipster2AddressModule } from './address/address.module';
import { PruebaJHipster2BankModule } from './bank/bank.module';
import { PruebaJHipster2AlumnoModule } from './alumno/alumno.module';
import { PruebaJHipster2MateriaModule } from './materia/materia.module';
import { PruebaJHipster2ProfesorModule } from './profesor/profesor.module';
import { PruebaJHipster2PersonaModule } from './persona/persona.module';
import { PruebaJHipster2ProductoModule } from './producto/producto.module';
import { PruebaJHipster2NuevaCompraModule } from './nueva-compra/nueva-compra.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PruebaJHipster2PersonModule,
        PruebaJHipster2AddressModule,
        PruebaJHipster2BankModule,
        PruebaJHipster2AlumnoModule,
        PruebaJHipster2MateriaModule,
        PruebaJHipster2ProfesorModule,
        PruebaJHipster2PersonaModule,
        PruebaJHipster2ProductoModule,
        PruebaJHipster2NuevaCompraModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2EntityModule {}
