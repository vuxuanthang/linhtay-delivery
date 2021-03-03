/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CallCrmTestModule } from '../../../test.module';
import { PartnerMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix-delete-dialog.component';
import { PartnerMySuffixService } from '../../../../../../main/webapp/app/entities/partner-my-suffix/partner-my-suffix.service';

describe('Component Tests', () => {

    describe('PartnerMySuffix Management Delete Component', () => {
        let comp: PartnerMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PartnerMySuffixDeleteDialogComponent>;
        let service: PartnerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [PartnerMySuffixDeleteDialogComponent],
                providers: [
                    PartnerMySuffixService
                ]
            })
            .overrideTemplate(PartnerMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PartnerMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PartnerMySuffixService);
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
