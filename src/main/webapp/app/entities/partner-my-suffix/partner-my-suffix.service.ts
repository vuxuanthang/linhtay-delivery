import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PartnerMySuffix } from './partner-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PartnerMySuffix>;

@Injectable()
export class PartnerMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/partners';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(partner: PartnerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(partner);
        return this.http.post<PartnerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(partner: PartnerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(partner);
        return this.http.put<PartnerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PartnerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PartnerMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PartnerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PartnerMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PartnerMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PartnerMySuffix[]>): HttpResponse<PartnerMySuffix[]> {
        const jsonResponse: PartnerMySuffix[] = res.body;
        const body: PartnerMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PartnerMySuffix.
     */
    private convertItemFromServer(partner: PartnerMySuffix): PartnerMySuffix {
        const copy: PartnerMySuffix = Object.assign({}, partner);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(partner.createdOn);
        return copy;
    }

    /**
     * Convert a PartnerMySuffix to a JSON which can be sent to the server.
     */
    private convert(partner: PartnerMySuffix): PartnerMySuffix {
        const copy: PartnerMySuffix = Object.assign({}, partner);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(partner.createdOn);
        return copy;
    }
}
