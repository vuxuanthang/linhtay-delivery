import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BlockMySuffix } from './block-my-suffix.model';
import { BlockMySuffixService } from './block-my-suffix.service';

@Injectable()
export class BlockMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private blockService: BlockMySuffixService

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
                this.blockService.find(id)
                    .subscribe((blockResponse: HttpResponse<BlockMySuffix>) => {
                        const block: BlockMySuffix = blockResponse.body;
                        if (block.createdOn) {
                            block.createdOn = {
                                year: block.createdOn.getFullYear(),
                                month: block.createdOn.getMonth() + 1,
                                day: block.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.blockModalRef(component, block);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.blockModalRef(component, new BlockMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    blockModalRef(component: Component, block: BlockMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.block = block;
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
