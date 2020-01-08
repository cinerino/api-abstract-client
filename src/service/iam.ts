import { NO_CONTENT, OK } from 'http-status';

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
export interface IMember {
    typeOf: RoleType;
    project: { typeOf: factory.organizationType.Project; id: string };
    member: {
        typeOf: factory.personType;
        id: string;
        username: string;
        hasRole: IRole[];
    };
}

/**
 * IAMサービス
 */
export class IAMService extends Service {
    /**
     * ユーザー検索
     */
    public async searchUsers(params: {
        id?: string;
        username?: string;
        email?: string;
        telephone?: string;
        givenName?: string;
        familyName?: string;
    }): Promise<ISearchResult<factory.person.IPerson[]>> {
        return this.fetch({
            uri: '/iam/users',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * ユーザー取得
     */
    public async findUserById(params: {
        id: string;
    }): Promise<factory.person.IPerson> {
        return this.fetch({
            uri: `/iam/users/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロフィール検索
     */
    public async getUserProfile(params: {
        id: string;
    }): Promise<factory.person.IProfile> {
        return this.fetch({
            uri: `/iam/users/${params.id}/profile`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロフィール更新
     */
    public async updateUserProfile(params: factory.person.IProfile & {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/iam/users/${params.id}/profile`,
            method: 'PATCH',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ロール検索
     */
    public async searchRoles(params: any): Promise<ISearchResult<IRole[]>> {
        return this.fetch({
            uri: '/iam/roles',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * プロジェクトメンバー検索
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
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * プロジェクトメンバー取得
     */
    public async findMemberById(params: {
        id: string;
    }): Promise<IMember> {
        return this.fetch({
            uri: `/iam/members/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロジェクトメンバープロフィール検索
     */
    public async getMemberProfile(params: {
        id: string;
    }): Promise<factory.person.IProfile> {
        return this.fetch({
            uri: `/iam/members/${params.id}/profile`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロジェクトメンバープロフィール更新
     */
    public async updateMemberProfile(params: factory.person.IProfile & {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/iam/members/${params.id}/profile`,
            method: 'PATCH',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
