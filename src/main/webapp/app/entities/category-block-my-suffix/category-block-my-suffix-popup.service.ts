import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CategoryBlockMySuffix } from './category-block-my-suffix.model';
import { CategoryBlockMySuffixService } from './category-block-my-suffix.service';

@Injectable()
export class CategoryBlockMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private categoryBlockService: CategoryBlockMySuffixService

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
                this.categoryBlockService.find(id)
                    .subscribe((categoryBlockResponse: HttpResponse<CategoryBlockMySuffix>) => {
                        const categoryBlock: CategoryBlockMySuffix = categoryBlockResponse.body;
                        if (categoryBlock.createdOn) {
                            categoryBlock.createdOn = {
                                year: categoryBlock.createdOn.getFullYear(),
                                month: categoryBlock.createdOn.getMonth() + 1,
                                day: categoryBlock.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.categoryBlockModalRef(component, categoryBlock);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.categoryBlockModalRef(component, new CategoryBlockMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    categoryBlockModalRef(component: Component, categoryBlock: CategoryBlockMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.categoryBlock = categoryBlock;
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
