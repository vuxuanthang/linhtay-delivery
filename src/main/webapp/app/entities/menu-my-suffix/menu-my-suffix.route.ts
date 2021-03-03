import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MenuMySuffixComponent } from './menu-my-suffix.component';
import { MenuMySuffixDetailComponent } from './menu-my-suffix-detail.component';
import { MenuMySuffixPopupComponent } from './menu-my-suffix-dialog.component';
import { MenuMySuffixDeletePopupComponent } from './menu-my-suffix-delete-dialog.component';

export const menuRoute: Routes = [
    {
        path: 'menu-my-suffix',
        component: MenuMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'menu-my-suffix/:id',
        component: MenuMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuPopupRoute: Routes = [
    {
        path: 'menu-my-suffix-new',
        component: MenuMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-my-suffix/:id/edit',
        component: MenuMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-my-suffix/:id/delete',
        component: MenuMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.menu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
