import { BaseEntity } from './../../shared';

export class CategoryBlockMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public urlLink?: string,
        public active?: boolean,
        public createdOn?: any,
    ) {
        this.active = false;
    }
}
