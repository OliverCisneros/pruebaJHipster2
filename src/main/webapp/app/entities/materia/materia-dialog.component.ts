import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Materia } from './materia.model';
import { MateriaPopupService } from './materia-popup.service';
import { MateriaService } from './materia.service';
import { Alumno, AlumnoService } from '../alumno';
import { Profesor, ProfesorService } from '../profesor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-materia-dialog',
    templateUrl: './materia-dialog.component.html'
})
export class MateriaDialogComponent implements OnInit {

    materia: Materia;
    isSaving: boolean;

    alumnos: Alumno[];

    profesors: Profesor[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private materiaService: MateriaService,
        private alumnoService: AlumnoService,
        private profesorService: ProfesorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alumnoService.query()
            .subscribe((res: ResponseWrapper) => { this.alumnos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.profesorService
            .query({filter: 'materia-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.materia.profesor || !this.materia.profesor.id) {
                    this.profesors = res.json;
                } else {
                    this.profesorService
                        .find(this.materia.profesor.id)
                        .subscribe((subRes: Profesor) => {
                            this.profesors = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.materia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materiaService.update(this.materia));
        } else {
            this.subscribeToSaveResponse(
                this.materiaService.create(this.materia));
        }
    }

    private subscribeToSaveResponse(result: Observable<Materia>) {
        result.subscribe((res: Materia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Materia) {
        this.eventManager.broadcast({ name: 'materiaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackAlumnoById(index: number, item: Alumno) {
        return item.id;
    }

    trackProfesorById(index: number, item: Profesor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-materia-popup',
    template: ''
})
export class MateriaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materiaPopupService: MateriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materiaPopupService
                    .open(MateriaDialogComponent as Component, params['id']);
            } else {
                this.materiaPopupService
                    .open(MateriaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
