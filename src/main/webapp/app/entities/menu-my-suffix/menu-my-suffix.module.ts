import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    MenuMySuffixService,
    MenuMySuffixPopupService,
    MenuMySuffixComponent,
    MenuMySuffixDetailComponent,
    MenuMySuffixDialogComponent,
    MenuMySuffixPopupComponent,
    MenuMySuffixDeletePopupComponent,
    MenuMySuffixDeleteDialogComponent,
    menuRoute,
    menuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...menuRoute,
    ...menuPopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MenuMySuffixComponent,
        MenuMySuffixDetailComponent,
        MenuMySuffixDialogComponent,
        MenuMySuffixDeleteDialogComponent,
        MenuMySuffixPopupComponent,
        MenuMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MenuMySuffixComponent,
        MenuMySuffixDialogComponent,
        MenuMySuffixPopupComponent,
        MenuMySuffixDeleteDialogComponent,
        MenuMySuffixDeletePopupComponent,
    ],
    providers: [
        MenuMySuffixService,
        MenuMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmMenuMySuffixModule {}
