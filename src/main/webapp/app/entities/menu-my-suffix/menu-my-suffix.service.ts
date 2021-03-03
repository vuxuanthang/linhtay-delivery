import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MenuMySuffix } from './menu-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MenuMySuffix>;

@Injectable()
export class MenuMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/menus';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(menu: MenuMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(menu);
        return this.http.post<MenuMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(menu: MenuMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(menu);
        return this.http.put<MenuMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MenuMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MenuMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MenuMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MenuMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MenuMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MenuMySuffix[]>): HttpResponse<MenuMySuffix[]> {
        const jsonResponse: MenuMySuffix[] = res.body;
        const body: MenuMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MenuMySuffix.
     */
    private convertItemFromServer(menu: MenuMySuffix): MenuMySuffix {
        const copy: MenuMySuffix = Object.assign({}, menu);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(menu.createdOn);
        return copy;
    }

    /**
     * Convert a MenuMySuffix to a JSON which can be sent to the server.
     */
    private convert(menu: MenuMySuffix): MenuMySuffix {
        const copy: MenuMySuffix = Object.assign({}, menu);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(menu.createdOn);
        return copy;
    }
}
