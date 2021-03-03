import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SliderMySuffix } from './slider-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SliderMySuffix>;

@Injectable()
export class SliderMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/sliders';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(slider: SliderMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(slider);
        return this.http.post<SliderMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(slider: SliderMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(slider);
        return this.http.put<SliderMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SliderMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SliderMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SliderMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SliderMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SliderMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SliderMySuffix[]>): HttpResponse<SliderMySuffix[]> {
        const jsonResponse: SliderMySuffix[] = res.body;
        const body: SliderMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SliderMySuffix.
     */
    private convertItemFromServer(slider: SliderMySuffix): SliderMySuffix {
        const copy: SliderMySuffix = Object.assign({}, slider);
        copy.createdOn = this.dateUtils
            .convertLocalDateFromServer(slider.createdOn);
        return copy;
    }

    /**
     * Convert a SliderMySuffix to a JSON which can be sent to the server.
     */
    private convert(slider: SliderMySuffix): SliderMySuffix {
        const copy: SliderMySuffix = Object.assign({}, slider);
        copy.createdOn = this.dateUtils
            .convertLocalDateToServer(slider.createdOn);
        return copy;
    }
}
