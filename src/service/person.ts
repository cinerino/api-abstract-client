import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

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
         */
        personId: string;
    }): Promise<factory.person.IProfile> {
        return this.fetch({
            uri: `/people/${params.personId}/profile`,
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
         */
        personId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/people/${params.personId}/profile`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
    /**
     * 注文を検索する
     */
    public async searchOrders(params: factory.order.ISearchConditions & {
        personId: string;
    }): Promise<ISearchResult<factory.order.IOrder[]>> {
        return this.fetch({
            uri: `/people/${params.personId}/orders`,
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
}
