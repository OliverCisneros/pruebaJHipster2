import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    PersonService,
    PersonPopupService,
    PersonComponent,
    PersonDetailComponent,
    PersonDialogComponent,
    PersonPopupComponent,
    PersonDeletePopupComponent,
    PersonDeleteDialogComponent,
    personRoute,
    personPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonComponent,
        PersonDetailComponent,
        PersonDialogComponent,
        PersonDeleteDialogComponent,
        PersonPopupComponent,
        PersonDeletePopupComponent,
    ],
    entryComponents: [
        PersonComponent,
        PersonDialogComponent,
        PersonPopupComponent,
        PersonDeleteDialogComponent,
        PersonDeletePopupComponent,
    ],
    providers: [
        PersonService,
        PersonPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2PersonModule {}
