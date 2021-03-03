/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { MenuMySuffixComponent } from '../../../../../../main/webapp/app/entities/menu-my-suffix/menu-my-suffix.component';
import { MenuMySuffixService } from '../../../../../../main/webapp/app/entities/menu-my-suffix/menu-my-suffix.service';
import { MenuMySuffix } from '../../../../../../main/webapp/app/entities/menu-my-suffix/menu-my-suffix.model';

describe('Component Tests', () => {

    describe('MenuMySuffix Management Component', () => {
        let comp: MenuMySuffixComponent;
        let fixture: ComponentFixture<MenuMySuffixComponent>;
        let service: MenuMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [MenuMySuffixComponent],
                providers: [
                    MenuMySuffixService
                ]
            })
            .overrideTemplate(MenuMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MenuMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.menus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
