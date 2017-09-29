/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PruebaJHipster2TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NuevaCompraDetailComponent } from '../../../../../../main/webapp/app/entities/nueva-compra/nueva-compra-detail.component';
import { NuevaCompraService } from '../../../../../../main/webapp/app/entities/nueva-compra/nueva-compra.service';
import { NuevaCompra } from '../../../../../../main/webapp/app/entities/nueva-compra/nueva-compra.model';

describe('Component Tests', () => {

    describe('NuevaCompra Management Detail Component', () => {
        let comp: NuevaCompraDetailComponent;
        let fixture: ComponentFixture<NuevaCompraDetailComponent>;
        let service: NuevaCompraService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PruebaJHipster2TestModule],
                declarations: [NuevaCompraDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NuevaCompraService,
                    JhiEventManager
                ]
            }).overrideTemplate(NuevaCompraDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NuevaCompraDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NuevaCompraService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new NuevaCompra(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.nuevaCompra).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
