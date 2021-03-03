import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SliderMySuffixComponent } from './slider-my-suffix.component';
import { SliderMySuffixDetailComponent } from './slider-my-suffix-detail.component';
import { SliderMySuffixPopupComponent } from './slider-my-suffix-dialog.component';
import { SliderMySuffixDeletePopupComponent } from './slider-my-suffix-delete-dialog.component';

export const sliderRoute: Routes = [
    {
        path: 'slider-my-suffix',
        component: SliderMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.slider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'slider-my-suffix/:id',
        component: SliderMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.slider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sliderPopupRoute: Routes = [
    {
        path: 'slider-my-suffix-new',
        component: SliderMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.slider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slider-my-suffix/:id/edit',
        component: SliderMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.slider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'slider-my-suffix/:id/delete',
        component: SliderMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'callCrmApp.slider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
