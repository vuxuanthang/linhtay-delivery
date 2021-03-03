import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MenuMySuffix } from './menu-my-suffix.model';
import { MenuMySuffixService } from './menu-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-menu-my-suffix',
    templateUrl: './menu-my-suffix.component.html'
})
export class MenuMySuffixComponent implements OnInit, OnDestroy {
menus: MenuMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private menuService: MenuMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.menuService.query().subscribe(
            (res: HttpResponse<MenuMySuffix[]>) => {
                this.menus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMenus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MenuMySuffix) {
        return item.id;
    }
    registerChangeInMenus() {
        this.eventSubscriber = this.eventManager.subscribe('menuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
