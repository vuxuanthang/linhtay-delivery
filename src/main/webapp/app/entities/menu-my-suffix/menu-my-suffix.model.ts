import { BaseEntity } from './../../shared';

export class MenuMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public model?: string,
        public url?: string,
        public active?: boolean,
        public createdOn?: any,
    ) {
        this.active = false;
    }
}
