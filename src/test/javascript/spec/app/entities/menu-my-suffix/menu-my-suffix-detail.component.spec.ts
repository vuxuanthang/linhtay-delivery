/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { MenuMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/menu-my-suffix/menu-my-suffix-detail.component';
import { MenuMySuffixService } from '../../../../../../main/webapp/app/entities/menu-my-suffix/menu-my-suffix.service';
import { MenuMySuffix } from '../../../../../../main/webapp/app/entities/menu-my-suffix/menu-my-suffix.model';

describe('Component Tests', () => {

    describe('MenuMySuffix Management Detail Component', () => {
        let comp: MenuMySuffixDetailComponent;
        let fixture: ComponentFixture<MenuMySuffixDetailComponent>;
        let service: MenuMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [MenuMySuffixDetailComponent],
                providers: [
                    MenuMySuffixService
                ]
            })
            .overrideTemplate(MenuMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MenuMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.menu).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
