import { BaseEntity } from './../../shared';

export class LeadMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public fullName?: string,
        public isContact?: string,
        public mobilePhone?: string,
        public email?: string,
        public address?: string,
        public city?: string,
        public country?: string,
        public userCode?: string,
        public createdOn?: any,
    ) {
    }
}
