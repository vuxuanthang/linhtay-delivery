/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { LeadMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/lead-my-suffix/lead-my-suffix-detail.component';
import { LeadMySuffixService } from '../../../../../../main/webapp/app/entities/lead-my-suffix/lead-my-suffix.service';
import { LeadMySuffix } from '../../../../../../main/webapp/app/entities/lead-my-suffix/lead-my-suffix.model';

describe('Component Tests', () => {

    describe('LeadMySuffix Management Detail Component', () => {
        let comp: LeadMySuffixDetailComponent;
        let fixture: ComponentFixture<LeadMySuffixDetailComponent>;
        let service: LeadMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [LeadMySuffixDetailComponent],
                providers: [
                    LeadMySuffixService
                ]
            })
            .overrideTemplate(LeadMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeadMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeadMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LeadMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lead).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
