import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NuevaCompra } from './nueva-compra.model';
import { NuevaCompraPopupService } from './nueva-compra-popup.service';
import { NuevaCompraService } from './nueva-compra.service';
import { Persona, PersonaService } from '../persona';
import { Producto, ProductoService } from '../producto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-nueva-compra-dialog',
    templateUrl: './nueva-compra-dialog.component.html'
})
export class NuevaCompraDialogComponent implements OnInit {

    nuevaCompra: NuevaCompra;
    isSaving: boolean;

    personas: Persona[];

    productos: Producto[];
    fechaTransaccionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private nuevaCompraService: NuevaCompraService,
        private personaService: PersonaService,
        private productoService: ProductoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personaService.query()
            .subscribe((res: ResponseWrapper) => { this.personas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.productoService.query()
            .subscribe((res: ResponseWrapper) => { this.productos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.nuevaCompra.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nuevaCompraService.update(this.nuevaCompra));
        } else {
            this.subscribeToSaveResponse(
                this.nuevaCompraService.create(this.nuevaCompra));
        }
    }

    private subscribeToSaveResponse(result: Observable<NuevaCompra>) {
        result.subscribe((res: NuevaCompra) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: NuevaCompra) {
        this.eventManager.broadcast({ name: 'nuevaCompraListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackPersonaById(index: number, item: Persona) {
        return item.id;
    }

    trackProductoById(index: number, item: Producto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-nueva-compra-popup',
    template: ''
})
export class NuevaCompraPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nuevaCompraPopupService: NuevaCompraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nuevaCompraPopupService
                    .open(NuevaCompraDialogComponent as Component, params['id']);
            } else {
                this.nuevaCompraPopupService
                    .open(NuevaCompraDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
