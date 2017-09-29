import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AlumnoComponent } from './alumno.component';
import { AlumnoDetailComponent } from './alumno-detail.component';
import { AlumnoPopupComponent } from './alumno-dialog.component';
import { AlumnoDeletePopupComponent } from './alumno-delete-dialog.component';

export const alumnoRoute: Routes = [
    {
        path: 'alumno',
        component: AlumnoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.alumno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'alumno/:id',
        component: AlumnoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.alumno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alumnoPopupRoute: Routes = [
    {
        path: 'alumno-new',
        component: AlumnoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.alumno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alumno/:id/edit',
        component: AlumnoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.alumno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alumno/:id/delete',
        component: AlumnoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pruebaJHipster2App.alumno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
