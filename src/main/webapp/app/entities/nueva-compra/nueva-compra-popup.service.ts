import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevaCompra } from './nueva-compra.model';
import { NuevaCompraService } from './nueva-compra.service';

@Injectable()
export class NuevaCompraPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private nuevaCompraService: NuevaCompraService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.nuevaCompraService.find(id).subscribe((nuevaCompra) => {
                    if (nuevaCompra.fechaTransaccion) {
                        nuevaCompra.fechaTransaccion = {
                            year: nuevaCompra.fechaTransaccion.getFullYear(),
                            month: nuevaCompra.fechaTransaccion.getMonth() + 1,
                            day: nuevaCompra.fechaTransaccion.getDate()
                        };
                    }
                    this.ngbModalRef = this.nuevaCompraModalRef(component, nuevaCompra);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.nuevaCompraModalRef(component, new NuevaCompra());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    nuevaCompraModalRef(component: Component, nuevaCompra: NuevaCompra): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.nuevaCompra = nuevaCompra;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
