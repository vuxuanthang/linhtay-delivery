import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BlockMySuffix } from './block-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BlockMySuffix>;

@Injectable()
export class BlockMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/blocks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(block: BlockMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(block);
        return this.http.post<BlockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(block: BlockMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(block);
        return this.http.put<BlockMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BlockMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BlockMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<BlockMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BlockMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BlockMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BlockMySuffix[]>): HttpResponse<BlockMySuffix[]> {
        const jsonResponse: BlockMySuffix[] = res.body;
        const body: BlockMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BlockMySuffix.
     */
    private convertItemFromServer(block: BlockMySuffix): BlockMySuffix {
        const copy: BlockMySuffix = Object.assign({}, block);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(block.createdOn);
        return copy;
    }

    /**
     * Convert a BlockMySuffix to a JSON which can be sent to the server.
     */
    private convert(block: BlockMySuffix): BlockMySuffix {
        const copy: BlockMySuffix = Object.assign({}, block);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(block.createdOn);
        return copy;
    }
}
