import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryBlockMySuffix } from './category-block-my-suffix.model';
import { CategoryBlockMySuffixService } from './category-block-my-suffix.service';

@Component({
    selector: 'jhi-category-block-my-suffix-detail',
    templateUrl: './category-block-my-suffix-detail.component.html'
})
export class CategoryBlockMySuffixDetailComponent implements OnInit, OnDestroy {

    categoryBlock: CategoryBlockMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private categoryBlockService: CategoryBlockMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategoryBlocks();
    }

    load(id) {
        this.categoryBlockService.find(id)
            .subscribe((categoryBlockResponse: HttpResponse<CategoryBlockMySuffix>) => {
                this.categoryBlock = categoryBlockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategoryBlocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoryBlockListModification',
            (response) => this.load(this.categoryBlock.id)
        );
    }
}
