import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Alumno } from './alumno.model';
import { AlumnoService } from './alumno.service';

@Component({
    selector: 'jhi-alumno-detail',
    templateUrl: './alumno-detail.component.html'
})
export class AlumnoDetailComponent implements OnInit, OnDestroy {

    alumno: Alumno;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alumnoService: AlumnoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlumnos();
    }

    load(id) {
        this.alumnoService.find(id).subscribe((alumno) => {
            this.alumno = alumno;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlumnos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alumnoListModification',
            (response) => this.load(this.alumno.id)
        );
    }
}
