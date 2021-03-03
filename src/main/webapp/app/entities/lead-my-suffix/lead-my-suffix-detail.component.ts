import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LeadMySuffix } from './lead-my-suffix.model';
import { LeadMySuffixService } from './lead-my-suffix.service';

@Component({
    selector: 'jhi-lead-my-suffix-detail',
    templateUrl: './lead-my-suffix-detail.component.html'
})
export class LeadMySuffixDetailComponent implements OnInit, OnDestroy {

    lead: LeadMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private leadService: LeadMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLeads();
    }

    load(id) {
        this.leadService.find(id)
            .subscribe((leadResponse: HttpResponse<LeadMySuffix>) => {
                this.lead = leadResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLeads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'leadListModification',
            (response) => this.load(this.lead.id)
        );
    }
}
