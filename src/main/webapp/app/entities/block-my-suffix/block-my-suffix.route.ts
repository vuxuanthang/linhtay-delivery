import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BlockMySuffixComponent } from './block-my-suffix.component';
import { BlockMySuffixDetailComponent } from './block-my-suffix-detail.component';
import { BlockMySuffixPopupComponent } from './block-my-suffix-dialog.component';
import { BlockMySuffixDeletePopupComponent } from './block-my-suffix-delete-dialog.component';

export const blockRoute: Routes = [
    {
        path: 'block-my-suffix',
        component: BlockMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.block.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'block-my-suffix/:id',
        component: BlockMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.block.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blockPopupRoute: Routes = [
    {
        path: 'block-my-suffix-new',
        component: BlockMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.block.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'block-my-suffix/:id/edit',
        component: BlockMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.block.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'block-my-suffix/:id/delete',
        component: BlockMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.block.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
