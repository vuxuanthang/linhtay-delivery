import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PageMySuffix } from './page-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PageMySuffix>;

@Injectable()
export class PageMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/pages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(page: PageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(page);
        return this.http.post<PageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(page: PageMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(page);
        return this.http.put<PageMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PageMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PageMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PageMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PageMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PageMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PageMySuffix[]>): HttpResponse<PageMySuffix[]> {
        const jsonResponse: PageMySuffix[] = res.body;
        const body: PageMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PageMySuffix.
     */
    private convertItemFromServer(page: PageMySuffix): PageMySuffix {
        const copy: PageMySuffix = Object.assign({}, page);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(page.createdOn);
        return copy;
    }

    /**
     * Convert a PageMySuffix to a JSON which can be sent to the server.
     */
    private convert(page: PageMySuffix): PageMySuffix {
        const copy: PageMySuffix = Object.assign({}, page);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(page.createdOn);
        return copy;
    }
}
