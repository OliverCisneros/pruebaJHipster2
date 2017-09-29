import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { NuevaCompra } from './nueva-compra.model';
import { NuevaCompraService } from './nueva-compra.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-nueva-compra',
    templateUrl: './nueva-compra.component.html'
})
export class NuevaCompraComponent implements OnInit, OnDestroy {
nuevaCompras: NuevaCompra[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private nuevaCompraService: NuevaCompraService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.nuevaCompraService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.nuevaCompras = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.nuevaCompraService.query().subscribe(
            (res: ResponseWrapper) => {
                this.nuevaCompras = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNuevaCompras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NuevaCompra) {
        return item.id;
    }
    registerChangeInNuevaCompras() {
        this.eventSubscriber = this.eventManager.subscribe('nuevaCompraListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
