import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Materia } from './materia.model';
import { MateriaService } from './materia.service';

@Component({
    selector: 'jhi-materia-detail',
    templateUrl: './materia-detail.component.html'
})
export class MateriaDetailComponent implements OnInit, OnDestroy {

    materia: Materia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private materiaService: MateriaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaterias();
    }

    load(id) {
        this.materiaService.find(id).subscribe((materia) => {
            this.materia = materia;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaterias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'materiaListModification',
            (response) => this.load(this.materia.id)
        );
    }
}
