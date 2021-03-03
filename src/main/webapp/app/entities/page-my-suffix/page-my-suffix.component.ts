import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PageMySuffix } from './page-my-suffix.model';
import { PageMySuffixService } from './page-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-page-my-suffix',
    templateUrl: './page-my-suffix.component.html'
})
export class PageMySuffixComponent implements OnInit, OnDestroy {
pages: PageMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pageService: PageMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pageService.query().subscribe(
            (res: HttpResponse<PageMySuffix[]>) => {
                this.pages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PageMySuffix) {
        return item.id;
    }
    registerChangeInPages() {
        this.eventSubscriber = this.eventManager.subscribe('pageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
