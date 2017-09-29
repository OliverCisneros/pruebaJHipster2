import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Alumno } from './alumno.model';
import { AlumnoPopupService } from './alumno-popup.service';
import { AlumnoService } from './alumno.service';

@Component({
    selector: 'jhi-alumno-delete-dialog',
    templateUrl: './alumno-delete-dialog.component.html'
})
export class AlumnoDeleteDialogComponent {

    alumno: Alumno;

    constructor(
        private alumnoService: AlumnoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alumnoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alumnoListModification',
                content: 'Deleted an alumno'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alumno-delete-popup',
    template: ''
})
export class AlumnoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alumnoPopupService: AlumnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alumnoPopupService
                .open(AlumnoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
