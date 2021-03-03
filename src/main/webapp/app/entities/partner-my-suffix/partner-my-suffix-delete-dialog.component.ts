import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PartnerMySuffix } from './partner-my-suffix.model';
import { PartnerMySuffixPopupService } from './partner-my-suffix-popup.service';
import { PartnerMySuffixService } from './partner-my-suffix.service';

@Component({
    selector: 'jhi-partner-my-suffix-delete-dialog',
    templateUrl: './partner-my-suffix-delete-dialog.component.html'
})
export class PartnerMySuffixDeleteDialogComponent {

    partner: PartnerMySuffix;

    constructor(
        private partnerService: PartnerMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.partnerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'partnerListModification',
                content: 'Deleted an partner'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-partner-my-suffix-delete-popup',
    template: ''
})
export class PartnerMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private partnerPopupService: PartnerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.partnerPopupService
                .open(PartnerMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
