/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PruebaJHipster2TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AlumnoDetailComponent } from '../../../../../../main/webapp/app/entities/alumno/alumno-detail.component';
import { AlumnoService } from '../../../../../../main/webapp/app/entities/alumno/alumno.service';
import { Alumno } from '../../../../../../main/webapp/app/entities/alumno/alumno.model';

describe('Component Tests', () => {

    describe('Alumno Management Detail Component', () => {
        let comp: AlumnoDetailComponent;
        let fixture: ComponentFixture<AlumnoDetailComponent>;
        let service: AlumnoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PruebaJHipster2TestModule],
                declarations: [AlumnoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AlumnoService,
                    JhiEventManager
                ]
            }).overrideTemplate(AlumnoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlumnoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlumnoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Alumno(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.alumno).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
