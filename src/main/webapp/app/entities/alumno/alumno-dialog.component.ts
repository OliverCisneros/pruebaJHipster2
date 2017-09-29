import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Alumno } from './alumno.model';
import { AlumnoPopupService } from './alumno-popup.service';
import { AlumnoService } from './alumno.service';

@Component({
    selector: 'jhi-alumno-dialog',
    templateUrl: './alumno-dialog.component.html'
})
export class AlumnoDialogComponent implements OnInit {

    alumno: Alumno;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private alumnoService: AlumnoService,
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
        if (this.alumno.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alumnoService.update(this.alumno));
        } else {
            this.subscribeToSaveResponse(
                this.alumnoService.create(this.alumno));
        }
    }

    private subscribeToSaveResponse(result: Observable<Alumno>) {
        result.subscribe((res: Alumno) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Alumno) {
        this.eventManager.broadcast({ name: 'alumnoListModification', content: 'OK'});
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
    selector: 'jhi-alumno-popup',
    template: ''
})
export class AlumnoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alumnoPopupService: AlumnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alumnoPopupService
                    .open(AlumnoDialogComponent as Component, params['id']);
            } else {
                this.alumnoPopupService
                    .open(AlumnoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
