import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BankComponent } from './bank.component';
import { BankDetailComponent } from './bank-detail.component';
import { BankPopupComponent } from './bank-dialog.component';
import { BankDeletePopupComponent } from './bank-delete-dialog.component';

export const bankRoute: Routes = [
    {
        path: 'bank',
        component: BankComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank/:id',
        component: BankDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
    {
        path: 'bank-new',
        component: BankPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank/:id/edit',
        component: BankPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank/:id/delete',
        component: BankDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
