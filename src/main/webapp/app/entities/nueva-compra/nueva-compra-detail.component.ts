import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { NuevaCompra } from './nueva-compra.model';
import { NuevaCompraService } from './nueva-compra.service';

@Component({
    selector: 'jhi-nueva-compra-detail',
    templateUrl: './nueva-compra-detail.component.html'
})
export class NuevaCompraDetailComponent implements OnInit, OnDestroy {

    nuevaCompra: NuevaCompra;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nuevaCompraService: NuevaCompraService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNuevaCompras();
    }

    load(id) {
        this.nuevaCompraService.find(id).subscribe((nuevaCompra) => {
            this.nuevaCompra = nuevaCompra;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNuevaCompras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nuevaCompraListModification',
            (response) => this.load(this.nuevaCompra.id)
        );
    }
}
