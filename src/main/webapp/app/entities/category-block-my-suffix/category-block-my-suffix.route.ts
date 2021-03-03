import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoryBlockMySuffixComponent } from './category-block-my-suffix.component';
import { CategoryBlockMySuffixDetailComponent } from './category-block-my-suffix-detail.component';
import { CategoryBlockMySuffixPopupComponent } from './category-block-my-suffix-dialog.component';
import { CategoryBlockMySuffixDeletePopupComponent } from './category-block-my-suffix-delete-dialog.component';

export const categoryBlockRoute: Routes = [
    {
        path: 'category-block-my-suffix',
        component: CategoryBlockMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.categoryBlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-block-my-suffix/:id',
        component: CategoryBlockMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.categoryBlock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryBlockPopupRoute: Routes = [
    {
        path: 'category-block-my-suffix-new',
        component: CategoryBlockMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.categoryBlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-block-my-suffix/:id/edit',
        component: CategoryBlockMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.categoryBlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-block-my-suffix/:id/delete',
        component: CategoryBlockMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.categoryBlock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
