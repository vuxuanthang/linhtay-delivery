/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { PageMySuffixComponent } from '../../../../../../main/webapp/app/entities/page-my-suffix/page-my-suffix.component';
import { PageMySuffixService } from '../../../../../../main/webapp/app/entities/page-my-suffix/page-my-suffix.service';
import { PageMySuffix } from '../../../../../../main/webapp/app/entities/page-my-suffix/page-my-suffix.model';

describe('Component Tests', () => {

    describe('PageMySuffix Management Component', () => {
        let comp: PageMySuffixComponent;
        let fixture: ComponentFixture<PageMySuffixComponent>;
        let service: PageMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [PageMySuffixComponent],
                providers: [
                    PageMySuffixService
                ]
            })
            .overrideTemplate(PageMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PageMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PageMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
