/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CallCrmTestModule } from '../../../test.module';
import { CategoryBlockMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix-dialog.component';
import { CategoryBlockMySuffixService } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.service';
import { CategoryBlockMySuffix } from '../../../../../../main/webapp/app/entities/category-block-my-suffix/category-block-my-suffix.model';

describe('Component Tests', () => {

    describe('CategoryBlockMySuffix Management Dialog Component', () => {
        let comp: CategoryBlockMySuffixDialogComponent;
        let fixture: ComponentFixture<CategoryBlockMySuffixDialogComponent>;
        let service: CategoryBlockMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [CategoryBlockMySuffixDialogComponent],
                providers: [
                    CategoryBlockMySuffixService
                ]
            })
            .overrideTemplate(CategoryBlockMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryBlockMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryBlockMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryBlockMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.categoryBlock = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryBlockListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryBlockMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.categoryBlock = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryBlockListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
