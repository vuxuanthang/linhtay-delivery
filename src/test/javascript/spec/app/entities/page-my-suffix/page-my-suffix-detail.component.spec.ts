/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { PageMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/page-my-suffix/page-my-suffix-detail.component';
import { PageMySuffixService } from '../../../../../../main/webapp/app/entities/page-my-suffix/page-my-suffix.service';
import { PageMySuffix } from '../../../../../../main/webapp/app/entities/page-my-suffix/page-my-suffix.model';

describe('Component Tests', () => {

    describe('PageMySuffix Management Detail Component', () => {
        let comp: PageMySuffixDetailComponent;
        let fixture: ComponentFixture<PageMySuffixDetailComponent>;
        let service: PageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [PageMySuffixDetailComponent],
                providers: [
                    PageMySuffixService
                ]
            })
            .overrideTemplate(PageMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PageMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PageMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.page).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
