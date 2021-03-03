import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SliderMySuffix } from './slider-my-suffix.model';
import { SliderMySuffixPopupService } from './slider-my-suffix-popup.service';
import { SliderMySuffixService } from './slider-my-suffix.service';

@Component({
    selector: 'jhi-slider-my-suffix-delete-dialog',
    templateUrl: './slider-my-suffix-delete-dialog.component.html'
})
export class SliderMySuffixDeleteDialogComponent {

    slider: SliderMySuffix;

    constructor(
        private sliderService: SliderMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sliderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sliderListModification',
                content: 'Deleted an slider'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-slider-my-suffix-delete-popup',
    template: ''
})
export class SliderMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sliderPopupService: SliderMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sliderPopupService
                .open(SliderMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
