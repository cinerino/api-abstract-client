import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 資産取引サービス
 */
export class AssetTransactionService extends Service {
    /**
     * 取引検索
     */
    public async search<T extends factory.assetTransactionType>(
        params: factory.assetTransaction.ISearchConditions<T>
    ): Promise<ISearchResult<factory.assetTransaction.ITransaction<T>[]>> {
        return this.fetch({
            uri: '/assetTransactions',
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
