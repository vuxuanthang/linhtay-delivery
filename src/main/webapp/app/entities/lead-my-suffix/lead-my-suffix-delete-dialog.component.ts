import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LeadMySuffix } from './lead-my-suffix.model';
import { LeadMySuffixPopupService } from './lead-my-suffix-popup.service';
import { LeadMySuffixService } from './lead-my-suffix.service';

@Component({
    selector: 'jhi-lead-my-suffix-delete-dialog',
    templateUrl: './lead-my-suffix-delete-dialog.component.html'
})
export class LeadMySuffixDeleteDialogComponent {

    lead: LeadMySuffix;

    constructor(
        private leadService: LeadMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.leadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'leadListModification',
                content: 'Deleted an lead'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lead-my-suffix-delete-popup',
    template: ''
})
export class LeadMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private leadPopupService: LeadMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.leadPopupService
                .open(LeadMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
