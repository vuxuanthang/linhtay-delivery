import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BlockMySuffix } from './block-my-suffix.model';
import { BlockMySuffixPopupService } from './block-my-suffix-popup.service';
import { BlockMySuffixService } from './block-my-suffix.service';

@Component({
    selector: 'jhi-block-my-suffix-delete-dialog',
    templateUrl: './block-my-suffix-delete-dialog.component.html'
})
export class BlockMySuffixDeleteDialogComponent {

    block: BlockMySuffix;

    constructor(
        private blockService: BlockMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blockService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'blockListModification',
                content: 'Deleted an block'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-block-my-suffix-delete-popup',
    template: ''
})
export class BlockMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blockPopupService: BlockMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.blockPopupService
                .open(BlockMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
