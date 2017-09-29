import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    ProfesorService,
    ProfesorPopupService,
    ProfesorComponent,
    ProfesorDetailComponent,
    ProfesorDialogComponent,
    ProfesorPopupComponent,
    ProfesorDeletePopupComponent,
    ProfesorDeleteDialogComponent,
    profesorRoute,
    profesorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...profesorRoute,
    ...profesorPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfesorComponent,
        ProfesorDetailComponent,
        ProfesorDialogComponent,
        ProfesorDeleteDialogComponent,
        ProfesorPopupComponent,
        ProfesorDeletePopupComponent,
    ],
    entryComponents: [
        ProfesorComponent,
        ProfesorDialogComponent,
        ProfesorPopupComponent,
        ProfesorDeleteDialogComponent,
        ProfesorDeletePopupComponent,
    ],
    providers: [
        ProfesorService,
        ProfesorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2ProfesorModule {}
