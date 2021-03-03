import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SliderMySuffix } from './slider-my-suffix.model';
import { SliderMySuffixService } from './slider-my-suffix.service';

@Component({
    selector: 'jhi-slider-my-suffix-detail',
    templateUrl: './slider-my-suffix-detail.component.html'
})
export class SliderMySuffixDetailComponent implements OnInit, OnDestroy {

    slider: SliderMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sliderService: SliderMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSliders();
    }

    load(id) {
        this.sliderService.find(id)
            .subscribe((sliderResponse: HttpResponse<SliderMySuffix>) => {
                this.slider = sliderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSliders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sliderListModification',
            (response) => this.load(this.slider.id)
        );
    }
}
