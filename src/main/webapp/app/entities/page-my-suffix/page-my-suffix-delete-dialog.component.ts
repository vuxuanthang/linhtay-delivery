import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PageMySuffix } from './page-my-suffix.model';
import { PageMySuffixPopupService } from './page-my-suffix-popup.service';
import { PageMySuffixService } from './page-my-suffix.service';

@Component({
    selector: 'jhi-page-my-suffix-delete-dialog',
    templateUrl: './page-my-suffix-delete-dialog.component.html'
})
export class PageMySuffixDeleteDialogComponent {

    page: PageMySuffix;

    constructor(
        private pageService: PageMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pageListModification',
                content: 'Deleted an page'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-page-my-suffix-delete-popup',
    template: ''
})
export class PageMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagePopupService: PageMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagePopupService
                .open(PageMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
