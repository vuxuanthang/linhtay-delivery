/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { SliderMySuffixComponent } from '../../../../../../main/webapp/app/entities/slider-my-suffix/slider-my-suffix.component';
import { SliderMySuffixService } from '../../../../../../main/webapp/app/entities/slider-my-suffix/slider-my-suffix.service';
import { SliderMySuffix } from '../../../../../../main/webapp/app/entities/slider-my-suffix/slider-my-suffix.model';

describe('Component Tests', () => {

    describe('SliderMySuffix Management Component', () => {
        let comp: SliderMySuffixComponent;
        let fixture: ComponentFixture<SliderMySuffixComponent>;
        let service: SliderMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [SliderMySuffixComponent],
                providers: [
                    SliderMySuffixService
                ]
            })
            .overrideTemplate(SliderMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SliderMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SliderMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SliderMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sliders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
