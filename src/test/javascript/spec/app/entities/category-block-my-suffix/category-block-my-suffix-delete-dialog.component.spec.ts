/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CallCrmTestModule } from '../../../test.module';
import { CategoryBlockMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix-delete-dialog.component';
import { CategoryBlockMySuffixService } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.service';

describe('Component Tests', () => {

    describe('CategoryBlockMySuffix Management Delete Component', () => {
        let comp: CategoryBlockMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CategoryBlockMySuffixDeleteDialogComponent>;
        let service: CategoryBlockMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [CategoryBlockMySuffixDeleteDialogComponent],
                providers: [
                    CategoryBlockMySuffixService
                ]
            })
            .overrideTemplate(CategoryBlockMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryBlockMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryBlockMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
