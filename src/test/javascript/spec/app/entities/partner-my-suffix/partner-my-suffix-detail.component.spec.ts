/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { PartnerMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix-detail.component';
import { PartnerMySuffixService } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix.service';
import { PartnerMySuffix } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix.model';

describe('Component Tests', () => {

    describe('PartnerMySuffix Management Detail Component', () => {
        let comp: PartnerMySuffixDetailComponent;
        let fixture: ComponentFixture<PartnerMySuffixDetailComponent>;
        let service: PartnerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [PartnerMySuffixDetailComponent],
                providers: [
                    PartnerMySuffixService
                ]
            })
            .overrideTemplate(PartnerMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartnerMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartnerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PartnerMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.partner).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
