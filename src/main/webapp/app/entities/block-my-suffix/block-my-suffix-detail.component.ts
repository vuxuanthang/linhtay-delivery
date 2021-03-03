import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BlockMySuffix } from './block-my-suffix.model';
import { BlockMySuffixService } from './block-my-suffix.service';

@Component({
    selector: 'jhi-block-my-suffix-detail',
    templateUrl: './block-my-suffix-detail.component.html'
})
export class BlockMySuffixDetailComponent implements OnInit, OnDestroy {

    block: BlockMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private blockService: BlockMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlocks();
    }

    load(id) {
        this.blockService.find(id)
            .subscribe((blockResponse: HttpResponse<BlockMySuffix>) => {
                this.block = blockResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlocks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blockListModification',
            (response) => this.load(this.block.id)
        );
    }
}
