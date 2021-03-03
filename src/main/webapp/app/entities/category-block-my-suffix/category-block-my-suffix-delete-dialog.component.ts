import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryBlockMySuffix } from './category-block-my-suffix.model';
import { CategoryBlockMySuffixPopupService } from './category-block-my-suffix-popup.service';
import { CategoryBlockMySuffixService } from './category-block-my-suffix.service';

@Component({
    selector: 'jhi-category-block-my-suffix-delete-dialog',
    templateUrl: './category-block-my-suffix-delete-dialog.component.html'
})
export class CategoryBlockMySuffixDeleteDialogComponent {

    categoryBlock: CategoryBlockMySuffix;

    constructor(
        private categoryBlockService: CategoryBlockMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryBlockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryBlockListModification',
                content: 'Deleted an categoryBlock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-block-my-suffix-delete-popup',
    template: ''
})
export class CategoryBlockMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryBlockPopupService: CategoryBlockMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoryBlockPopupService
                .open(CategoryBlockMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
