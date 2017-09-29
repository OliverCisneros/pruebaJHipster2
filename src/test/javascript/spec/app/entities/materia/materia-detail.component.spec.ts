/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PruebaJHipster2TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MateriaDetailComponent } from '../../../../../../main/webapp/app/entities/materia/materia-detail.component';
import { MateriaService } from '../../../../../../main/webapp/app/entities/materia/materia.service';
import { Materia } from '../../../../../../main/webapp/app/entities/materia/materia.model';

describe('Component Tests', () => {

    describe('Materia Management Detail Component', () => {
        let comp: MateriaDetailComponent;
        let fixture: ComponentFixture<MateriaDetailComponent>;
        let service: MateriaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PruebaJHipster2TestModule],
                declarations: [MateriaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MateriaService,
                    JhiEventManager
                ]
            }).overrideTemplate(MateriaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MateriaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MateriaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Materia(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.materia).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
