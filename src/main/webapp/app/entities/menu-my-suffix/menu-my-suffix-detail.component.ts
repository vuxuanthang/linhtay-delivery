import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MenuMySuffix } from './menu-my-suffix.model';
import { MenuMySuffixService } from './menu-my-suffix.service';

@Component({
    selector: 'jhi-menu-my-suffix-detail',
    templateUrl: './menu-my-suffix-detail.component.html'
})
export class MenuMySuffixDetailComponent implements OnInit, OnDestroy {

    menu: MenuMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private menuService: MenuMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMenus();
    }

    load(id) {
        this.menuService.find(id)
            .subscribe((menuResponse: HttpResponse<MenuMySuffix>) => {
                this.menu = menuResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMenus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'menuListModification',
            (response) => this.load(this.menu.id)
        );
    }
}
