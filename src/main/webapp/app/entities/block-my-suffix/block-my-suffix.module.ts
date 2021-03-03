import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    BlockMySuffixService,
    BlockMySuffixPopupService,
    BlockMySuffixComponent,
    BlockMySuffixDetailComponent,
    BlockMySuffixDialogComponent,
    BlockMySuffixPopupComponent,
    BlockMySuffixDeletePopupComponent,
    BlockMySuffixDeleteDialogComponent,
    blockRoute,
    blockPopupRoute,
} from './';

const ENTITY_STATES = [
    ...blockRoute,
    ...blockPopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BlockMySuffixComponent,
        BlockMySuffixDetailComponent,
        BlockMySuffixDialogComponent,
        BlockMySuffixDeleteDialogComponent,
        BlockMySuffixPopupComponent,
        BlockMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BlockMySuffixComponent,
        BlockMySuffixDialogComponent,
        BlockMySuffixPopupComponent,
        BlockMySuffixDeleteDialogComponent,
        BlockMySuffixDeletePopupComponent,
    ],
    providers: [
        BlockMySuffixService,
        BlockMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmBlockMySuffixModule {}
