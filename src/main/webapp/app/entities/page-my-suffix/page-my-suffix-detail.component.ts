import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PageMySuffix } from './page-my-suffix.model';
import { PageMySuffixService } from './page-my-suffix.service';

@Component({
    selector: 'jhi-page-my-suffix-detail',
    templateUrl: './page-my-suffix-detail.component.html'
})
export class PageMySuffixDetailComponent implements OnInit, OnDestroy {

    page: PageMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pageService: PageMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPages();
    }

    load(id) {
        this.pageService.find(id)
            .subscribe((pageResponse: HttpResponse<PageMySuffix>) => {
                this.page = pageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pageListModification',
            (response) => this.load(this.page.id)
        );
    }
}
