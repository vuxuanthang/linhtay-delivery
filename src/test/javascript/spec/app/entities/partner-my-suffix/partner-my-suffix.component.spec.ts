/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { PartnerMySuffixComponent } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix.component';
import { PartnerMySuffixService } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix.service';
import { PartnerMySuffix } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix.model';

describe('Component Tests', () => {

    describe('PartnerMySuffix Management Component', () => {
        let comp: PartnerMySuffixComponent;
        let fixture: ComponentFixture<PartnerMySuffixComponent>;
        let service: PartnerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [PartnerMySuffixComponent],
                providers: [
                    PartnerMySuffixService
                ]
            })
            .overrideTemplate(PartnerMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartnerMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartnerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PartnerMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.partners[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
