import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    SliderMySuffixService,
    SliderMySuffixPopupService,
    SliderMySuffixComponent,
    SliderMySuffixDetailComponent,
    SliderMySuffixDialogComponent,
    SliderMySuffixPopupComponent,
    SliderMySuffixDeletePopupComponent,
    SliderMySuffixDeleteDialogComponent,
    sliderRoute,
    sliderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sliderRoute,
    ...sliderPopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SliderMySuffixComponent,
        SliderMySuffixDetailComponent,
        SliderMySuffixDialogComponent,
        SliderMySuffixDeleteDialogComponent,
        SliderMySuffixPopupComponent,
        SliderMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SliderMySuffixComponent,
        SliderMySuffixDialogComponent,
        SliderMySuffixPopupComponent,
        SliderMySuffixDeleteDialogComponent,
        SliderMySuffixDeletePopupComponent,
    ],
    providers: [
        SliderMySuffixService,
        SliderMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmSliderMySuffixModule {}
