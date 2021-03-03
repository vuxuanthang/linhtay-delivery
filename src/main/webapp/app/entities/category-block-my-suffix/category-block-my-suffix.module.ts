import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CallCrmSharedModule } from '../../shared';
import {
    CategoryBlockMySuffixService,
    CategoryBlockMySuffixPopupService,
    CategoryBlockMySuffixComponent,
    CategoryBlockMySuffixDetailComponent,
    CategoryBlockMySuffixDialogComponent,
    CategoryBlockMySuffixPopupComponent,
    CategoryBlockMySuffixDeletePopupComponent,
    CategoryBlockMySuffixDeleteDialogComponent,
    categoryBlockRoute,
    categoryBlockPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryBlockRoute,
    ...categoryBlockPopupRoute,
];

@NgModule({
    imports: [
        CallCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoryBlockMySuffixComponent,
        CategoryBlockMySuffixDetailComponent,
        CategoryBlockMySuffixDialogComponent,
        CategoryBlockMySuffixDeleteDialogComponent,
        CategoryBlockMySuffixPopupComponent,
        CategoryBlockMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CategoryBlockMySuffixComponent,
        CategoryBlockMySuffixDialogComponent,
        CategoryBlockMySuffixPopupComponent,
        CategoryBlockMySuffixDeleteDialogComponent,
        CategoryBlockMySuffixDeletePopupComponent,
    ],
    providers: [
        CategoryBlockMySuffixService,
        CategoryBlockMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmCategoryBlockMySuffixModule {}
