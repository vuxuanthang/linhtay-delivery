import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PageMySuffix } from './page-my-suffix.model';
import { PageMySuffixService } from './page-my-suffix.service';

@Injectable()
export class PageMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pageService: PageMySuffixService

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
                this.pageService.find(id)
                    .subscribe((pageResponse: HttpResponse<PageMySuffix>) => {
                        const page: PageMySuffix = pageResponse.body;
                        if (page.createdOn) {
                            page.createdOn = {
                                year: page.createdOn.getFullYear(),
                                month: page.createdOn.getMonth() + 1,
                                day: page.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.pageModalRef(component, page);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pageModalRef(component, new PageMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pageModalRef(component: Component, page: PageMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.page = page;
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
