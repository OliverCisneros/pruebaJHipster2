import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Persona } from './persona.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PersonaService {

    private resourceUrl = SERVER_API_URL + 'api/personas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/personas';

    constructor(private http: Http) { }

    create(persona: Persona): Observable<Persona> {
        const copy = this.convert(persona);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(persona: Persona): Observable<Persona> {
        const copy = this.convert(persona);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Persona> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(persona: Persona): Persona {
        const copy: Persona = Object.assign({}, persona);
        return copy;
    }
}
