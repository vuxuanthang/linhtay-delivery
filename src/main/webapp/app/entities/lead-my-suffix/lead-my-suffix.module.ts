import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    LeadMySuffixService,
    LeadMySuffixPopupService,
    LeadMySuffixComponent,
    LeadMySuffixDetailComponent,
    LeadMySuffixDialogComponent,
    LeadMySuffixPopupComponent,
    LeadMySuffixDeletePopupComponent,
    LeadMySuffixDeleteDialogComponent,
    leadRoute,
    leadPopupRoute,
} from './';

const ENTITY_STATES = [
    ...leadRoute,
    ...leadPopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LeadMySuffixComponent,
        LeadMySuffixDetailComponent,
        LeadMySuffixDialogComponent,
        LeadMySuffixDeleteDialogComponent,
        LeadMySuffixPopupComponent,
        LeadMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LeadMySuffixComponent,
        LeadMySuffixDialogComponent,
        LeadMySuffixPopupComponent,
        LeadMySuffixDeleteDialogComponent,
        LeadMySuffixDeletePopupComponent,
    ],
    providers: [
        LeadMySuffixService,
        LeadMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmLeadMySuffixModule {}
