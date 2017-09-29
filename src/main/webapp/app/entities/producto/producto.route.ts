import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProductoComponent } from './producto.component';
import { ProductoDetailComponent } from './producto-detail.component';
import { ProductoPopupComponent } from './producto-dialog.component';
import { ProductoDeletePopupComponent } from './producto-delete-dialog.component';

export const productoRoute: Routes = [
    {
        path: 'producto',
        component: ProductoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.producto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'producto/:id',
        component: ProductoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.producto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productoPopupRoute: Routes = [
    {
        path: 'producto-new',
        component: ProductoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.producto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto/:id/edit',
        component: ProductoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.producto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto/:id/delete',
        component: ProductoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.producto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
