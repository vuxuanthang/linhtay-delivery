import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PageMySuffixComponent } from './page-my-suffix.component';
import { PageMySuffixDetailComponent } from './page-my-suffix-detail.component';
import { PageMySuffixPopupComponent } from './page-my-suffix-dialog.component';
import { PageMySuffixDeletePopupComponent } from './page-my-suffix-delete-dialog.component';

export const pageRoute: Routes = [
    {
        path: 'page-my-suffix',
        component: PageMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.page.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'page-my-suffix/:id',
        component: PageMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.page.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagePopupRoute: Routes = [
    {
        path: 'page-my-suffix-new',
        component: PageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.page.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'page-my-suffix/:id/edit',
        component: PageMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.page.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'page-my-suffix/:id/delete',
        component: PageMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.page.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
