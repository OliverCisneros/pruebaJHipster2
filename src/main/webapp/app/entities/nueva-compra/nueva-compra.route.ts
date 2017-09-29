import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NuevaCompraComponent } from './nueva-compra.component';
import { NuevaCompraDetailComponent } from './nueva-compra-detail.component';
import { NuevaCompraPopupComponent } from './nueva-compra-dialog.component';
import { NuevaCompraDeletePopupComponent } from './nueva-compra-delete-dialog.component';

export const nuevaCompraRoute: Routes = [
    {
        path: 'nueva-compra',
        component: NuevaCompraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.nuevaCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'nueva-compra/:id',
        component: NuevaCompraDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.nuevaCompra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nuevaCompraPopupRoute: Routes = [
    {
        path: 'nueva-compra-new',
        component: NuevaCompraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.nuevaCompra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nueva-compra/:id/edit',
        component: NuevaCompraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.nuevaCompra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'nueva-compra/:id/delete',
        component: NuevaCompraDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.nuevaCompra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
