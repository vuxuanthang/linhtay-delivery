import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BlockMySuffix } from './block-my-suffix.model';
import { BlockMySuffixPopupService } from './block-my-suffix-popup.service';
import { BlockMySuffixService } from './block-my-suffix.service';
import { CategoryBlockMySuffix, CategoryBlockMySuffixService } from '../category-block-my-suffix';

@Component({
    selector: 'jhi-block-my-suffix-dialog',
    templateUrl: './block-my-suffix-dialog.component.html'
})
export class BlockMySuffixDialogComponent implements OnInit {

    block: BlockMySuffix;
    isSaving: boolean;

    categoryblocks: CategoryBlockMySuffix[];
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private blockService: BlockMySuffixService,
        private categoryBlockService: CategoryBlockMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryBlockService.query()
            .subscribe((res: HttpResponse<CategoryBlockMySuffix[]>) => { this.categoryblocks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.block.id !== undefined) {
            this.subscribeToSaveResponse(
                this.blockService.update(this.block));
        } else {
            this.subscribeToSaveResponse(
                this.blockService.create(this.block));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BlockMySuffix>>) {
        result.subscribe((res: HttpResponse<BlockMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BlockMySuffix) {
        this.eventManager.broadcast({ name: 'blockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryBlockById(index: number, item: CategoryBlockMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-block-my-suffix-popup',
    template: ''
})
export class BlockMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blockPopupService: BlockMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.blockPopupService
                    .open(BlockMySuffixDialogComponent as Component, params['id']);
            } else {
                this.blockPopupService
                    .open(BlockMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
