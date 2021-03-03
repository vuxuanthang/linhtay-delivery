import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PartnerMySuffixComponent } from './partner-my-suffix.component';
import { PartnerMySuffixDetailComponent } from './partner-my-suffix-detail.component';
import { PartnerMySuffixPopupComponent } from './partner-my-suffix-dialog.component';
import { PartnerMySuffixDeletePopupComponent } from './partner-my-suffix-delete-dialog.component';

export const partnerRoute: Routes = [
    {
        path: 'partner-my-suffix',
        component: PartnerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.partner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'partner-my-suffix/:id',
        component: PartnerMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.partner.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partnerPopupRoute: Routes = [
    {
        path: 'partner-my-suffix-new',
        component: PartnerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.partner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partner-my-suffix/:id/edit',
        component: PartnerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.partner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'partner-my-suffix/:id/delete',
        component: PartnerMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.partner.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
