/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { SliderMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/slider-my-suffix/slider-my-suffix-detail.component';
import { SliderMySuffixService } from '../../../../../../main/webapp/app/entities/slider-my-suffix/slider-my-suffix.service';
import { SliderMySuffix } from '../../../../../../main/webapp/app/entities/slider-my-suffix/slider-my-suffix.model';

describe('Component Tests', () => {

    describe('SliderMySuffix Management Detail Component', () => {
        let comp: SliderMySuffixDetailComponent;
        let fixture: ComponentFixture<SliderMySuffixDetailComponent>;
        let service: SliderMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [SliderMySuffixDetailComponent],
                providers: [
                    SliderMySuffixService
                ]
            })
            .overrideTemplate(SliderMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SliderMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SliderMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SliderMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.slider).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
