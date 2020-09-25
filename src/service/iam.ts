import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export enum RoleType {
    OrganizationRole = 'OrganizationRole'
}
export interface IRole {
    typeOf: RoleType;
    roleName: string;
    memberOf: { typeOf: factory.chevre.organizationType.Project; id: string };
}
export type IMemberType = factory.personType | factory.chevre.creativeWorkType.WebApplication;
export interface IMember {
    typeOf: RoleType;
    project: { typeOf: factory.chevre.organizationType.Project; id: string };
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
     * IAMロール検索
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
                    data: await response.json()
                };
            });
    }

    /**
     * IAMメンバー作成
     */
    public async createMember(params: any): Promise<IMember> {
        return this.fetch({
            uri: '/iam/members',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

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

    /**
     * IAMメンバー取得
     */
    public async findMemberById(params: {
        member: {
            id: string;
        };
    }): Promise<IMember> {
        return this.fetch({
            uri: `/iam/members/${params.member.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * IAMメンバー更新
     */
    public async updateMember(params: {
        member: {
            id: string;
            hasRole: { roleName: string }[];
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/iam/members/${params.member.id}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * IAMメンバー削除
     */
    public async deleteMember(params: {
        member: {
            id: string;
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/iam/members/${params.member.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * IAMメンバープロフィール検索
     */
    public async getMemberProfile(params: {
        member: {
            id: string;
        };
    }): Promise<factory.person.IProfile> {
        return this.fetch({
            uri: `/iam/members/${params.member.id}/profile`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * IAMメンバープロフィール更新
     */
    public async updateMemberProfile(params: {
        member: factory.person.IProfile & {
            id: string;
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/iam/members/${params.member.id}/profile`,
            method: 'PATCH',
            body: params.member,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
