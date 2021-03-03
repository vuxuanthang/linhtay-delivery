import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CategoryBlockMySuffix } from './category-block-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CategoryBlockMySuffix>;

@Injectable()
export class CategoryBlockMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/category-blocks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(categoryBlock: CategoryBlockMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(categoryBlock);
        return this.http.post<CategoryBlockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(categoryBlock: CategoryBlockMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(categoryBlock);
        return this.http.put<CategoryBlockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CategoryBlockMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CategoryBlockMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CategoryBlockMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CategoryBlockMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CategoryBlockMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CategoryBlockMySuffix[]>): HttpResponse<CategoryBlockMySuffix[]> {
        const jsonResponse: CategoryBlockMySuffix[] = res.body;
        const body: CategoryBlockMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CategoryBlockMySuffix.
     */
    private convertItemFromServer(categoryBlock: CategoryBlockMySuffix): CategoryBlockMySuffix {
        const copy: CategoryBlockMySuffix = Object.assign({}, categoryBlock);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(categoryBlock.createdOn);
        return copy;
    }

    /**
     * Convert a CategoryBlockMySuffix to a JSON which can be sent to the server.
     */
    private convert(categoryBlock: CategoryBlockMySuffix): CategoryBlockMySuffix {
        const copy: CategoryBlockMySuffix = Object.assign({}, categoryBlock);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(categoryBlock.createdOn);
        return copy;
    }
}
