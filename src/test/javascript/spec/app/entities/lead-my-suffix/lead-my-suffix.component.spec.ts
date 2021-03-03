/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { LeadMySuffixComponent } from '../../../../../../main/webapp/app/entities/lead-my-suffix/lead-my-suffix.component';
import { LeadMySuffixService } from '../../../../../../main/webapp/app/entities/lead-my-suffix/lead-my-suffix.service';
import { LeadMySuffix } from '../../../../../../main/webapp/app/entities/lead-my-suffix/lead-my-suffix.model';

describe('Component Tests', () => {

    describe('LeadMySuffix Management Component', () => {
        let comp: LeadMySuffixComponent;
        let fixture: ComponentFixture<LeadMySuffixComponent>;
        let service: LeadMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [LeadMySuffixComponent],
                providers: [
                    LeadMySuffixService
                ]
            })
            .overrideTemplate(LeadMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LeadMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LeadMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LeadMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.leads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
