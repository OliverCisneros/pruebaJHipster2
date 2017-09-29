import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Profesor } from './profesor.model';
import { ProfesorPopupService } from './profesor-popup.service';
import { ProfesorService } from './profesor.service';

@Component({
    selector: 'jhi-profesor-dialog',
    templateUrl: './profesor-dialog.component.html'
})
export class ProfesorDialogComponent implements OnInit {

    profesor: Profesor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private profesorService: ProfesorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.profesor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.profesorService.update(this.profesor));
        } else {
            this.subscribeToSaveResponse(
                this.profesorService.create(this.profesor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Profesor>) {
        result.subscribe((res: Profesor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Profesor) {
        this.eventManager.broadcast({ name: 'profesorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-profesor-popup',
    template: ''
})
export class ProfesorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private profesorPopupService: ProfesorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.profesorPopupService
                    .open(ProfesorDialogComponent as Component, params['id']);
            } else {
                this.profesorPopupService
                    .open(ProfesorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
