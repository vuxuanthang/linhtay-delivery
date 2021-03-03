import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SliderMySuffix } from './slider-my-suffix.model';
import { SliderMySuffixService } from './slider-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-slider-my-suffix',
    templateUrl: './slider-my-suffix.component.html'
})
export class SliderMySuffixComponent implements OnInit, OnDestroy {
sliders: SliderMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sliderService: SliderMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sliderService.query().subscribe(
            (res: HttpResponse<SliderMySuffix[]>) => {
                this.sliders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSliders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SliderMySuffix) {
        return item.id;
    }
    registerChangeInSliders() {
        this.eventSubscriber = this.eventManager.subscribe('sliderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
