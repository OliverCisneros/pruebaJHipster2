import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    BankService,
    BankPopupService,
    BankComponent,
    BankDetailComponent,
    BankDialogComponent,
    BankPopupComponent,
    BankDeletePopupComponent,
    BankDeleteDialogComponent,
    bankRoute,
    bankPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bankRoute,
    ...bankPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BankComponent,
        BankDetailComponent,
        BankDialogComponent,
        BankDeleteDialogComponent,
        BankPopupComponent,
        BankDeletePopupComponent,
    ],
    entryComponents: [
        BankComponent,
        BankDialogComponent,
        BankPopupComponent,
        BankDeleteDialogComponent,
        BankDeletePopupComponent,
    ],
    providers: [
        BankService,
        BankPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2BankModule {}
