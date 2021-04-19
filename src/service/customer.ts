import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export interface ICustomer extends factory.chevre.organization.IOrganization {
    id: string;
    name: factory.chevre.multilingualString;
    project: { id: string; typeOf: factory.chevre.organizationType.Project };
}

export interface ISearchConditions {
    limit?: number;
    page?: number;
    // project?: { id?: { $eq?: string } };
    name?: { $regex?: string };
}

/**
 * 顧客サービス
 */
export class CustomerService extends Service {
    /**
     * 顧客取得
     */
    public async findById(params: {
        id: string;
    }): Promise<ICustomer> {
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
    public async search(
        params: ISearchConditions
    ): Promise<ISearchResult<ICustomer[]>> {
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
