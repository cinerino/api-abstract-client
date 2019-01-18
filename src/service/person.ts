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
        /**
         * @deprecated Use params.id
         */
        personId?: string;
    }): Promise<factory.person.IProfile> {
        const id = (params.personId !== undefined) ? params.personId : (params.id !== undefined) ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/profile`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
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
        /**
         * @deprecated Use params.id
         */
        personId?: string;
    }): Promise<void> {
        const id = (params.personId !== undefined) ? params.personId : (params.id !== undefined) ? params.id : 'me';

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
        /**
         * @deprecated Use params.id
         */
        personId?: string;
    }): Promise<ISearchResult<factory.order.IOrder[]>> {
        const id = (params.personId !== undefined) ? params.personId : (params.id !== undefined) ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/orders`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
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
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }

    /**
     * IDで検索
     */
    public async findById(params: {
        id: string;
    }): Promise<IPerson> {
        return this.fetch({
            uri: `/people/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
