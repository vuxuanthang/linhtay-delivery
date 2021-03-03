import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SliderMySuffix } from './slider-my-suffix.model';
import { SliderMySuffixPopupService } from './slider-my-suffix-popup.service';
import { SliderMySuffixService } from './slider-my-suffix.service';

@Component({
    selector: 'jhi-slider-my-suffix-dialog',
    templateUrl: './slider-my-suffix-dialog.component.html'
})
export class SliderMySuffixDialogComponent implements OnInit {

    slider: SliderMySuffix;
    isSaving: boolean;
    createdOnDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private sliderService: SliderMySuffixService,
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
        if (this.slider.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sliderService.update(this.slider));
        } else {
            this.subscribeToSaveResponse(
                this.sliderService.create(this.slider));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SliderMySuffix>>) {
        result.subscribe((res: HttpResponse<SliderMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SliderMySuffix) {
        this.eventManager.broadcast({ name: 'sliderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-slider-my-suffix-popup',
    template: ''
})
export class SliderMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sliderPopupService: SliderMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sliderPopupService
                    .open(SliderMySuffixDialogComponent as Component, params['id']);
            } else {
                this.sliderPopupService
                    .open(SliderMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
