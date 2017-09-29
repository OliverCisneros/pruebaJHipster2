import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    PersonaService,
    PersonaPopupService,
    PersonaComponent,
    PersonaDetailComponent,
    PersonaDialogComponent,
    PersonaPopupComponent,
    PersonaDeletePopupComponent,
    PersonaDeleteDialogComponent,
    personaRoute,
    personaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personaRoute,
    ...personaPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonaComponent,
        PersonaDetailComponent,
        PersonaDialogComponent,
        PersonaDeleteDialogComponent,
        PersonaPopupComponent,
        PersonaDeletePopupComponent,
    ],
    entryComponents: [
        PersonaComponent,
        PersonaDialogComponent,
        PersonaPopupComponent,
        PersonaDeleteDialogComponent,
        PersonaDeletePopupComponent,
    ],
    providers: [
        PersonaService,
        PersonaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2PersonaModule {}
