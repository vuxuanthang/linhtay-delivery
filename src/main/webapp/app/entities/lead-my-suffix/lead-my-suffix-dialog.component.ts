import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeadMySuffix } from './lead-my-suffix.model';
import { LeadMySuffixPopupService } from './lead-my-suffix-popup.service';
import { LeadMySuffixService } from './lead-my-suffix.service';

@Component({
    selector: 'jhi-lead-my-suffix-dialog',
    templateUrl: './lead-my-suffix-dialog.component.html'
})
export class LeadMySuffixDialogComponent implements OnInit {

    lead: LeadMySuffix;
    isSaving: boolean;
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private leadService: LeadMySuffixService,
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
        if (this.lead.id !== undefined) {
            this.subscribeToSaveResponse(
                this.leadService.update(this.lead));
        } else {
            this.subscribeToSaveResponse(
                this.leadService.create(this.lead));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LeadMySuffix>>) {
        result.subscribe((res: HttpResponse<LeadMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LeadMySuffix) {
        this.eventManager.broadcast({ name: 'leadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-lead-my-suffix-popup',
    template: ''
})
export class LeadMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leadPopupService: LeadMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.leadPopupService
                    .open(LeadMySuffixDialogComponent as Component, params['id']);
            } else {
                this.leadPopupService
                    .open(LeadMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
