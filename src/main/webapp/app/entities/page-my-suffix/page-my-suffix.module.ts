import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    PageMySuffixService,
    PageMySuffixPopupService,
    PageMySuffixComponent,
    PageMySuffixDetailComponent,
    PageMySuffixDialogComponent,
    PageMySuffixPopupComponent,
    PageMySuffixDeletePopupComponent,
    PageMySuffixDeleteDialogComponent,
    pageRoute,
    pagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...pageRoute,
    ...pagePopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PageMySuffixComponent,
        PageMySuffixDetailComponent,
        PageMySuffixDialogComponent,
        PageMySuffixDeleteDialogComponent,
        PageMySuffixPopupComponent,
        PageMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PageMySuffixComponent,
        PageMySuffixDialogComponent,
        PageMySuffixPopupComponent,
        PageMySuffixDeleteDialogComponent,
        PageMySuffixDeletePopupComponent,
    ],
    providers: [
        PageMySuffixService,
        PageMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmPageMySuffixModule {}
