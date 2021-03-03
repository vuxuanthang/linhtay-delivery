import { BaseEntity } from './../../shared';

export class SliderMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public urlLink?: string,
        public active?: boolean,
        public createdOn?: any,
        public content?: string,
    ) {
        this.active = false;
    }
}
