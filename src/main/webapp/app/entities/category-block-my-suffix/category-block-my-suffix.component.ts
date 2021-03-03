import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CategoryBlockMySuffix } from './category-block-my-suffix.model';
import { CategoryBlockMySuffixService } from './category-block-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-category-block-my-suffix',
    templateUrl: './category-block-my-suffix.component.html'
})
export class CategoryBlockMySuffixComponent implements OnInit, OnDestroy {
categoryBlocks: CategoryBlockMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoryBlockService: CategoryBlockMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.categoryBlockService.query().subscribe(
            (res: HttpResponse<CategoryBlockMySuffix[]>) => {
                this.categoryBlocks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoryBlocks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CategoryBlockMySuffix) {
        return item.id;
    }
    registerChangeInCategoryBlocks() {
        this.eventSubscriber = this.eventManager.subscribe('categoryBlockListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
