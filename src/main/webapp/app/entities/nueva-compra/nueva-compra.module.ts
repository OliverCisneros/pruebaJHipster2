import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PruebaJHipster2SharedModule } from '../../shared';
import {
    NuevaCompraService,
    NuevaCompraPopupService,
    NuevaCompraComponent,
    NuevaCompraDetailComponent,
    NuevaCompraDialogComponent,
    NuevaCompraPopupComponent,
    NuevaCompraDeletePopupComponent,
    NuevaCompraDeleteDialogComponent,
    nuevaCompraRoute,
    nuevaCompraPopupRoute,
} from './';

const ENTITY_STATES = [
    ...nuevaCompraRoute,
    ...nuevaCompraPopupRoute,
];

@NgModule({
    imports: [
        PruebaJHipster2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        NuevaCompraComponent,
        NuevaCompraDetailComponent,
        NuevaCompraDialogComponent,
        NuevaCompraDeleteDialogComponent,
        NuevaCompraPopupComponent,
        NuevaCompraDeletePopupComponent,
    ],
    entryComponents: [
        NuevaCompraComponent,
        NuevaCompraDialogComponent,
        NuevaCompraPopupComponent,
        NuevaCompraDeleteDialogComponent,
        NuevaCompraDeletePopupComponent,
    ],
    providers: [
        NuevaCompraService,
        NuevaCompraPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PruebaJHipster2NuevaCompraModule {}
