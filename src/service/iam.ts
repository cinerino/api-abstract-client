import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

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
}
