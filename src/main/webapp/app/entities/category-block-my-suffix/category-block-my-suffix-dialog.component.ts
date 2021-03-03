import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryBlockMySuffix } from './category-block-my-suffix.model';
import { CategoryBlockMySuffixPopupService } from './category-block-my-suffix-popup.service';
import { CategoryBlockMySuffixService } from './category-block-my-suffix.service';

@Component({
    selector: 'jhi-category-block-my-suffix-dialog',
    templateUrl: './category-block-my-suffix-dialog.component.html'
})
export class CategoryBlockMySuffixDialogComponent implements OnInit {

    categoryBlock: CategoryBlockMySuffix;
    isSaving: boolean;
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private categoryBlockService: CategoryBlockMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.categoryBlock.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoryBlockService.update(this.categoryBlock));
        } else {
            this.subscribeToSaveResponse(
                this.categoryBlockService.create(this.categoryBlock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CategoryBlockMySuffix>>) {
        result.subscribe((res: HttpResponse<CategoryBlockMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoryBlockMySuffix) {
        this.eventManager.broadcast({ name: 'categoryBlockListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-category-block-my-suffix-popup',
    template: ''
})
export class CategoryBlockMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryBlockPopupService: CategoryBlockMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoryBlockPopupService
                    .open(CategoryBlockMySuffixDialogComponent as Component, params['id']);
            } else {
                this.categoryBlockPopupService
                    .open(CategoryBlockMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
