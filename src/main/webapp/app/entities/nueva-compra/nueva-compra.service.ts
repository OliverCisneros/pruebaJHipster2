import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NuevaCompra } from './nueva-compra.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NuevaCompraService {

    private resourceUrl = SERVER_API_URL + 'api/nueva-compras';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/nueva-compras';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(nuevaCompra: NuevaCompra): Observable<NuevaCompra> {
        const copy = this.convert(nuevaCompra);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(nuevaCompra: NuevaCompra): Observable<NuevaCompra> {
        const copy = this.convert(nuevaCompra);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<NuevaCompra> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.fechaTransaccion = this.dateUtils
            .convertLocalDateFromServer(entity.fechaTransaccion);
    }

    private convert(nuevaCompra: NuevaCompra): NuevaCompra {
        const copy: NuevaCompra = Object.assign({}, nuevaCompra);
        copy.fechaTransaccion = this.dateUtils
            .convertLocalDateToServer(nuevaCompra.fechaTransaccion);
        return copy;
    }
}
