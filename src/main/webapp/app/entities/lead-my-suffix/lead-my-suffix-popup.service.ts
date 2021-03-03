import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LeadMySuffix } from './lead-my-suffix.model';
import { LeadMySuffixService } from './lead-my-suffix.service';

@Injectable()
export class LeadMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private leadService: LeadMySuffixService

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
                this.leadService.find(id)
                    .subscribe((leadResponse: HttpResponse<LeadMySuffix>) => {
                        const lead: LeadMySuffix = leadResponse.body;
                        if (lead.createdOn) {
                            lead.createdOn = {
                                year: lead.createdOn.getFullYear(),
                                month: lead.createdOn.getMonth() + 1,
                                day: lead.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.leadModalRef(component, lead);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.leadModalRef(component, new LeadMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    leadModalRef(component: Component, lead: LeadMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lead = lead;
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
