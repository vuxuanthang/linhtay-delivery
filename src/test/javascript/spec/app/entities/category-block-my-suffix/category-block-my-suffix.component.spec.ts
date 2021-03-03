/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { CategoryBlockMySuffixComponent } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.component';
import { CategoryBlockMySuffixService } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.service';
import { CategoryBlockMySuffix } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.model';

describe('Component Tests', () => {

    describe('CategoryBlockMySuffix Management Component', () => {
        let comp: CategoryBlockMySuffixComponent;
        let fixture: ComponentFixture<CategoryBlockMySuffixComponent>;
        let service: CategoryBlockMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [CategoryBlockMySuffixComponent],
                providers: [
                    CategoryBlockMySuffixService
                ]
            })
            .overrideTemplate(CategoryBlockMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryBlockMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryBlockMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CategoryBlockMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categoryBlocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
