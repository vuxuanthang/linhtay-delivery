import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CallCrmPartnerMySuffixModule } from './partner-my-suffix/partner-my-suffix.module';
import { CallCrmLeadMySuffixModule } from './lead-my-suffix/lead-my-suffix.module';
import { CallCrmPageMySuffixModule } from './page-my-suffix/page-my-suffix.module';
import { CallCrmCategoryBlockMySuffixModule } from './category-block-my-suffix/category-block-my-suffix.module';
import { CallCrmBlockMySuffixModule } from './block-my-suffix/block-my-suffix.module';
import { CallCrmMenuMySuffixModule } from './menu-my-suffix/menu-my-suffix.module';
import { CallCrmSliderMySuffixModule } from './slider-my-suffix/slider-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CallCrmPartnerMySuffixModule,
        CallCrmLeadMySuffixModule,
        CallCrmPageMySuffixModule,
        CallCrmCategoryBlockMySuffixModule,
        CallCrmBlockMySuffixModule,
        CallCrmMenuMySuffixModule,
        CallCrmSliderMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CallCrmEntityModule {}
