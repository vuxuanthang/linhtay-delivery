import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MenuMySuffix } from './menu-my-suffix.model';
import { MenuMySuffixPopupService } from './menu-my-suffix-popup.service';
import { MenuMySuffixService } from './menu-my-suffix.service';

@Component({
    selector: 'jhi-menu-my-suffix-delete-dialog',
    templateUrl: './menu-my-suffix-delete-dialog.component.html'
})
export class MenuMySuffixDeleteDialogComponent {

    menu: MenuMySuffix;

    constructor(
        private menuService: MenuMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.menuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'menuListModification',
                content: 'Deleted an menu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-my-suffix-delete-popup',
    template: ''
})
export class MenuMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPopupService: MenuMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.menuPopupService
                .open(MenuMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
