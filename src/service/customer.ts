import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 顧客サービス
 */
export class CustomerService extends Service {
    /**
     * 顧客取得
     */
    public async findById(params: {
        id: string;
    }): Promise<factory.customer.ICustomer> {
        return this.fetch({
            uri: `/customers/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 顧客検索
     */
    public async search(params: factory.customer.ISearchConditions): Promise<ISearchResult<factory.customer.ICustomer[]>> {
        return this.fetch({
            uri: '/customers',
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
