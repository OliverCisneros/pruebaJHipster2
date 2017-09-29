import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    AlumnoService,
    AlumnoPopupService,
    AlumnoComponent,
    AlumnoDetailComponent,
    AlumnoDialogComponent,
    AlumnoPopupComponent,
    AlumnoDeletePopupComponent,
    AlumnoDeleteDialogComponent,
    alumnoRoute,
    alumnoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...alumnoRoute,
    ...alumnoPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AlumnoComponent,
        AlumnoDetailComponent,
        AlumnoDialogComponent,
        AlumnoDeleteDialogComponent,
        AlumnoPopupComponent,
        AlumnoDeletePopupComponent,
    ],
    entryComponents: [
        AlumnoComponent,
        AlumnoDialogComponent,
        AlumnoPopupComponent,
        AlumnoDeleteDialogComponent,
        AlumnoDeletePopupComponent,
    ],
    providers: [
        AlumnoService,
        AlumnoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2AlumnoModule {}
