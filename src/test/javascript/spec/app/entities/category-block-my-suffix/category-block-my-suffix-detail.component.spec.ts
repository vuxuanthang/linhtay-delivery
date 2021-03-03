/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { CategoryBlockMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix-detail.component';
import { CategoryBlockMySuffixService } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.service';
import { CategoryBlockMySuffix } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.model';

describe('Component Tests', () => {

    describe('CategoryBlockMySuffix Management Detail Component', () => {
        let comp: CategoryBlockMySuffixDetailComponent;
        let fixture: ComponentFixture<CategoryBlockMySuffixDetailComponent>;
        let service: CategoryBlockMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [CategoryBlockMySuffixDetailComponent],
                providers: [
                    CategoryBlockMySuffixService
                ]
            })
            .overrideTemplate(CategoryBlockMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryBlockMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryBlockMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CategoryBlockMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.categoryBlock).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
