import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MenuMySuffix } from './menu-my-suffix.model';
import { MenuMySuffixService } from './menu-my-suffix.service';

@Injectable()
export class MenuMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private menuService: MenuMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.menuService.find(id)
                    .subscribe((menuResponse: HttpResponse<MenuMySuffix>) => {
                        const menu: MenuMySuffix = menuResponse.body;
                        if (menu.createdOn) {
                            menu.createdOn = {
                                year: menu.createdOn.getFullYear(),
                                month: menu.createdOn.getMonth() + 1,
                                day: menu.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.menuModalRef(component, menu);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.menuModalRef(component, new MenuMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    menuModalRef(component: Component, menu: MenuMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.menu = menu;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
