/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CallCrmTestModule } from '../../../test.module';
import { BlockMySuffixComponent } from '../../../../../../main/webapp/app/entities/block-my-suffix/block-my-suffix.component';
import { BlockMySuffixService } from '../../../../../../main/webapp/app/entities/block-my-suffix/block-my-suffix.service';
import { BlockMySuffix } from '../../../../../../main/webapp/app/entities/block-my-suffix/block-my-suffix.model';

describe('Component Tests', () => {

    describe('BlockMySuffix Management Component', () => {
        let comp: BlockMySuffixComponent;
        let fixture: ComponentFixture<BlockMySuffixComponent>;
        let service: BlockMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CallCrmTestModule],
                declarations: [BlockMySuffixComponent],
                providers: [
                    BlockMySuffixService
                ]
            })
            .overrideTemplate(BlockMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlockMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlockMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BlockMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.blocks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
