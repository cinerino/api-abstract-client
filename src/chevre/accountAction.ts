import { OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * 口座アクションサービス
 */
export class AccountActionService extends Service {
    /**
     * 口座アクション検索
     */
    public async search(
        params: factory.account.action.moneyTransfer.ISearchConditions
    ): Promise<ISearchResult<factory.account.action.moneyTransfer.IAction[]>> {
        return this.fetch({
            uri: '/accountActions',
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
