import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LeadMySuffixComponent } from './lead-my-suffix.component';
import { LeadMySuffixDetailComponent } from './lead-my-suffix-detail.component';
import { LeadMySuffixPopupComponent } from './lead-my-suffix-dialog.component';
import { LeadMySuffixDeletePopupComponent } from './lead-my-suffix-delete-dialog.component';

export const leadRoute: Routes = [
    {
        path: 'lead-my-suffix',
        component: LeadMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.lead.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lead-my-suffix/:id',
        component: LeadMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.lead.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const leadPopupRoute: Routes = [
    {
        path: 'lead-my-suffix-new',
        component: LeadMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.lead.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lead-my-suffix/:id/edit',
        component: LeadMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.lead.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lead-my-suffix/:id/delete',
        component: LeadMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.lead.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
