import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    PartnerMySuffixService,
    PartnerMySuffixPopupService,
    PartnerMySuffixComponent,
    PartnerMySuffixDetailComponent,
    PartnerMySuffixDialogComponent,
    PartnerMySuffixPopupComponent,
    PartnerMySuffixDeletePopupComponent,
    PartnerMySuffixDeleteDialogComponent,
    partnerRoute,
    partnerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...partnerRoute,
    ...partnerPopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PartnerMySuffixComponent,
        PartnerMySuffixDetailComponent,
        PartnerMySuffixDialogComponent,
        PartnerMySuffixDeleteDialogComponent,
        PartnerMySuffixPopupComponent,
        PartnerMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PartnerMySuffixComponent,
        PartnerMySuffixDialogComponent,
        PartnerMySuffixPopupComponent,
        PartnerMySuffixDeleteDialogComponent,
        PartnerMySuffixDeletePopupComponent,
    ],
    providers: [
        PartnerMySuffixService,
        PartnerMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmPartnerMySuffixModule {}
