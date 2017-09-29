import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NuevaCompra } from './nueva-compra.model';
import { NuevaCompraPopupService } from './nueva-compra-popup.service';
import { NuevaCompraService } from './nueva-compra.service';

@Component({
    selector: 'jhi-nueva-compra-delete-dialog',
    templateUrl: './nueva-compra-delete-dialog.component.html'
})
export class NuevaCompraDeleteDialogComponent {

    nuevaCompra: NuevaCompra;

    constructor(
        private nuevaCompraService: NuevaCompraService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nuevaCompraService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nuevaCompraListModification',
                content: 'Deleted an nuevaCompra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nueva-compra-delete-popup',
    template: ''
})
export class NuevaCompraDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nuevaCompraPopupService: NuevaCompraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nuevaCompraPopupService
                .open(NuevaCompraDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
