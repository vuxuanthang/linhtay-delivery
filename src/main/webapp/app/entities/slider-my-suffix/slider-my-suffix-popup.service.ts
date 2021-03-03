import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SliderMySuffix } from './slider-my-suffix.model';
import { SliderMySuffixService } from './slider-my-suffix.service';

@Injectable()
export class SliderMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sliderService: SliderMySuffixService

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
                this.sliderService.find(id)
                    .subscribe((sliderResponse: HttpResponse<SliderMySuffix>) => {
                        const slider: SliderMySuffix = sliderResponse.body;
                        if (slider.createdOn) {
                            slider.createdOn = {
                                year: slider.createdOn.getFullYear(),
                                month: slider.createdOn.getMonth() + 1,
                                day: slider.createdOn.getDate()
                            };
                        }
                        this.ngbModalRef = this.sliderModalRef(component, slider);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sliderModalRef(component, new SliderMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sliderModalRef(component: Component, slider: SliderMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.slider = slider;
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
