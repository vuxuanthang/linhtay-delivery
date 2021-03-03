import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PageMySuffix } from './page-my-suffix.model';
import { PageMySuffixPopupService } from './page-my-suffix-popup.service';
import { PageMySuffixService } from './page-my-suffix.service';

@Component({
    selector: 'jhi-page-my-suffix-dialog',
    templateUrl: './page-my-suffix-dialog.component.html'
})
export class PageMySuffixDialogComponent implements OnInit {

    page: PageMySuffix;
    isSaving: boolean;
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private pageService: PageMySuffixService,
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
        if (this.page.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pageService.update(this.page));
        } else {
            this.subscribeToSaveResponse(
                this.pageService.create(this.page));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PageMySuffix>>) {
        result.subscribe((res: HttpResponse<PageMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PageMySuffix) {
        this.eventManager.broadcast({ name: 'pageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-page-my-suffix-popup',
    template: ''
})
export class PageMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagePopupService: PageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagePopupService
                    .open(PageMySuffixDialogComponent as Component, params['id']);
            } else {
                this.pagePopupService
                    .open(PageMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
