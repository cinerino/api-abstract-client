import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export enum RoleType {
    OrganizationRole = 'OrganizationRole'
}
export interface IRole {
    typeOf: RoleType;
    roleName: string;
    memberOf: { typeOf: factory.organizationType.Project; id: string };
}
export type IMemberType = factory.personType | factory.creativeWorkType.WebApplication;
export interface IMember {
    typeOf: RoleType;
    project: { typeOf: factory.organizationType.Project; id: string };
    member: {
        typeOf: IMemberType;
        id: string;
        name?: string;
        username?: string;
        hasRole: IRole[];
    };
}

/**
 * IAMサービス
 */
export class IAMService extends Service {
    /**
     * IAMメンバー検索
     */
    public async searchMembers(params: any): Promise<ISearchResult<IMember[]>> {
        return this.fetch({
            uri: '/iam/members',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    data: await response.json()
                };
            });
    }
}
