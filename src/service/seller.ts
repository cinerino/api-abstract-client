import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 販売者サービス
 */
export class SellerService extends Service {
    /**
     * 販売者取得
     */
    public async findById(params: {
        id: string;
    }): Promise<factory.seller.ISeller> {
        return this.fetch({
            uri: `/sellers/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 販売者検索
     */
    public async search(
        params: factory.seller.ISearchConditions
    ): Promise<ISearchResult<factory.seller.ISeller[]>> {
        return this.fetch({
            uri: '/sellers',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(<string>response.headers.get('X-Total-Count'))
                        : undefined,
                    data: await response.json()
                };
            });
    }
}
