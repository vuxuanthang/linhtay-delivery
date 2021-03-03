import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeadMySuffix } from './lead-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LeadMySuffix>;

@Injectable()
export class LeadMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/leads';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(lead: LeadMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(lead);
        return this.http.post<LeadMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lead: LeadMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(lead);
        return this.http.put<LeadMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LeadMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LeadMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LeadMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LeadMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LeadMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LeadMySuffix[]>): HttpResponse<LeadMySuffix[]> {
        const jsonResponse: LeadMySuffix[] = res.body;
        const body: LeadMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LeadMySuffix.
     */
    private convertItemFromServer(lead: LeadMySuffix): LeadMySuffix {
        const copy: LeadMySuffix = Object.assign({}, lead);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(lead.createdOn);
        return copy;
    }

    /**
     * Convert a LeadMySuffix to a JSON which can be sent to the server.
     */
    private convert(lead: LeadMySuffix): LeadMySuffix {
        const copy: LeadMySuffix = Object.assign({}, lead);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(lead.createdOn);
        return copy;
    }
}
