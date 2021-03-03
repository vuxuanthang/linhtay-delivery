import { BaseEntity } from './../../shared';

export class PageMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public content?: string,
        public urlLink?: string,
        public active?: boolean,
        public createdOn?: any,
    ) {
        this.active = false;
    }
}
