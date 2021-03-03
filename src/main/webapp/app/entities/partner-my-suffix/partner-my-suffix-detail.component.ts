import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PartnerMySuffix } from './partner-my-suffix.model';
import { PartnerMySuffixService } from './partner-my-suffix.service';

@Component({
    selector: 'jhi-partner-my-suffix-detail',
    templateUrl: './partner-my-suffix-detail.component.html'
})
export class PartnerMySuffixDetailComponent implements OnInit, OnDestroy {

    partner: PartnerMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private partnerService: PartnerMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPartners();
    }

    load(id) {
        this.partnerService.find(id)
            .subscribe((partnerResponse: HttpResponse<PartnerMySuffix>) => {
                this.partner = partnerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPartners() {
        this.eventSubscriber = this.eventManager.subscribe(
            'partnerListModification',
            (response) => this.load(this.partner.id)
        );
    }
}
