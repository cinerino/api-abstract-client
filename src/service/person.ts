import * as factory from '@cinerino/factory';
import { NO_CONTENT, OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * ユーザーサービス
 */
export class PersonService extends Service {
    /**
     * ユーザーの連絡先を検索する
     */
    public async getContacts(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
    }): Promise<factory.person.IContact> {
        return this.fetch({
            uri: `/people/${params.personId}/contacts`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * ユーザーの連絡先を更新する
     */
    public async updateContacts(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * contacts
         */
        contacts: factory.person.IContact;
    }): Promise<void> {
        await this.fetch({
            uri: `/people/${params.personId}/contacts`,
            method: 'PUT',
            body: params.contacts,
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
