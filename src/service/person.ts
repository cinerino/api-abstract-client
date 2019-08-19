import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IPerson = factory.person.IProfile & factory.person.IPerson;

/**
 * ユーザーサービス
 */
export class PersonService extends Service {
    /**
     * プロフィール検索
     */
    public async getProfile(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<factory.person.IProfile> {
        const id = (params.id !== undefined) ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/profile`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロフィール更新
     */
    public async updateProfile(params: factory.person.IProfile & {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<void> {
        const id = (params.id !== undefined) ? params.id : 'me';

        await this.fetch({
            uri: `/people/${id}/profile`,
            method: 'PATCH',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 注文を検索する
     */
    public async searchOrders(params: factory.order.ISearchConditions & {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<ISearchResult<factory.order.IOrder[]>> {
        const id = (params.id !== undefined) ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/orders`,
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
     * 会員検索
     */
    public async search(params: {
        id?: string;
        username?: string;
        email?: string;
        telephone?: string;
        givenName?: string;
        familyName?: string;
    }): Promise<ISearchResult<IPerson[]>> {
        return this.fetch({
            uri: '/people',
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
    public async findById(params: {
        id: string;
    }): Promise<IPerson> {
        return this.fetch({
            uri: `/people/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * ユーザー削除
     */
    public async deletById(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/people/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
