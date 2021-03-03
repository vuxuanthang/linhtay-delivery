import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MenuMySuffix } from './menu-my-suffix.model';
import { MenuMySuffixPopupService } from './menu-my-suffix-popup.service';
import { MenuMySuffixService } from './menu-my-suffix.service';

@Component({
    selector: 'jhi-menu-my-suffix-dialog',
    templateUrl: './menu-my-suffix-dialog.component.html'
})
export class MenuMySuffixDialogComponent implements OnInit {

    menu: MenuMySuffix;
    isSaving: boolean;
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private menuService: MenuMySuffixService,
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
        if (this.menu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.menuService.update(this.menu));
        } else {
            this.subscribeToSaveResponse(
                this.menuService.create(this.menu));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MenuMySuffix>>) {
        result.subscribe((res: HttpResponse<MenuMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MenuMySuffix) {
        this.eventManager.broadcast({ name: 'menuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-menu-my-suffix-popup',
    template: ''
})
export class MenuMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPopupService: MenuMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.menuPopupService
                    .open(MenuMySuffixDialogComponent as Component, params['id']);
            } else {
                this.menuPopupService
                    .open(MenuMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
