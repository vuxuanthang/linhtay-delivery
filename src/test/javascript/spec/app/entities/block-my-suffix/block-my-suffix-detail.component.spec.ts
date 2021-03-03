/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CallCrmTestModule } from '../../../test.module';
import { BlockMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/block-my-suffix/block-my-suffix-detail.component';
import { BlockMySuffixService } from '../../../../../../main/webapp/app/entities/block-my-suffix/block-my-suffix.service';
import { BlockMySuffix } from '../../../../../../main/webapp/app/entities/block-my-suffix/block-my-suffix.model';

describe('Component Tests', () => {

    describe('BlockMySuffix Management Detail Component', () => {
        let comp: BlockMySuffixDetailComponent;
        let fixture: ComponentFixture<BlockMySuffixDetailComponent>;
        let service: BlockMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [BlockMySuffixDetailComponent],
                providers: [
                    BlockMySuffixService
                ]
            })
            .overrideTemplate(BlockMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlockMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlockMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BlockMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.block).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
