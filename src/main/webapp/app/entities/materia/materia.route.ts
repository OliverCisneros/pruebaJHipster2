import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MateriaComponent } from './materia.component';
import { MateriaDetailComponent } from './materia-detail.component';
import { MateriaPopupComponent } from './materia-dialog.component';
import { MateriaDeletePopupComponent } from './materia-delete-dialog.component';

export const materiaRoute: Routes = [
    {
        path: 'materia',
        component: MateriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.materia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'materia/:id',
        component: MateriaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.materia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materiaPopupRoute: Routes = [
    {
        path: 'materia-new',
        component: MateriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.materia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materia/:id/edit',
        component: MateriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.materia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'materia/:id/delete',
        component: MateriaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.materia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
