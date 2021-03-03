import { BaseEntity } from './../../shared';

export class BlockMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public urlLink?: string,
        public active?: boolean,
        public createdOn?: any,
        public content?: string,
        public categoryBlockId?: number,
    ) {
        this.active = false;
    }
}
