import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PartnerMySuffix } from './partner-my-suffix.model';
import { PartnerMySuffixService } from './partner-my-suffix.service';

@Injectable()
export class PartnerMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private partnerService: PartnerMySuffixService

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
                this.partnerService.find(id)
                    .subscribe((partnerResponse: HttpResponse<PartnerMySuffix>) => {
                        const partner: PartnerMySuffix = partnerResponse.body;
                        if (partner.createdOn) {
                            partner.createdOn = {
                                year: partner.createdOn.getFullYear(),
                                month: partner.createdOn.getMonth() + 1,
                                day: partner.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.partnerModalRef(component, partner);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.partnerModalRef(component, new PartnerMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    partnerModalRef(component: Component, partner: PartnerMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.partner = partner;
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
