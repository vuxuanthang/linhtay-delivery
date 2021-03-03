import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PartnerMySuffix } from './partner-my-suffix.model';
import { PartnerMySuffixPopupService } from './partner-my-suffix-popup.service';
import { PartnerMySuffixService } from './partner-my-suffix.service';

@Component({
    selector: 'jhi-partner-my-suffix-dialog',
    templateUrl: './partner-my-suffix-dialog.component.html'
})
export class PartnerMySuffixDialogComponent implements OnInit {

    partner: PartnerMySuffix;
    isSaving: boolean;
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private partnerService: PartnerMySuffixService,
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
        if (this.partner.id !== undefined) {
            this.subscribeToSaveResponse(
                this.partnerService.update(this.partner));
        } else {
            this.subscribeToSaveResponse(
                this.partnerService.create(this.partner));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PartnerMySuffix>>) {
        result.subscribe((res: HttpResponse<PartnerMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PartnerMySuffix) {
        this.eventManager.broadcast({ name: 'partnerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-partner-my-suffix-popup',
    template: ''
})
export class PartnerMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partnerPopupService: PartnerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.partnerPopupService
                    .open(PartnerMySuffixDialogComponent as Component, params['id']);
            } else {
                this.partnerPopupService
                    .open(PartnerMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
