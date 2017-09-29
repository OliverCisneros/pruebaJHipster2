import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    MateriaService,
    MateriaPopupService,
    MateriaComponent,
    MateriaDetailComponent,
    MateriaDialogComponent,
    MateriaPopupComponent,
    MateriaDeletePopupComponent,
    MateriaDeleteDialogComponent,
    materiaRoute,
    materiaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...materiaRoute,
    ...materiaPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MateriaComponent,
        MateriaDetailComponent,
        MateriaDialogComponent,
        MateriaDeleteDialogComponent,
        MateriaPopupComponent,
        MateriaDeletePopupComponent,
    ],
    entryComponents: [
        MateriaComponent,
        MateriaDialogComponent,
        MateriaPopupComponent,
        MateriaDeleteDialogComponent,
        MateriaDeletePopupComponent,
    ],
    providers: [
        MateriaService,
        MateriaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2MateriaModule {}
