import { BaseEntity } from './../../shared';

export class PartnerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public fullName?: string,
        public isContact?: string,
        public mobilePhone?: string,
        public email?: string,
        public address?: string,
        public userCode?: string,
        public createdOn?: any,
    ) {
    }
}
