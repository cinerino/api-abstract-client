import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';
import { ISetProfileParams, TransactionService } from '../transaction';

/**
 * 通貨転送取引サービス
 */
export class MoneyTransferTransactionService extends Service implements TransactionService {
    public typeOf: factory.transactionType.MoneyTransfer = factory.transactionType.MoneyTransfer;

    /**
     * 取引を開始する
     */
    public async start<T extends factory.accountType, T2 extends factory.transaction.moneyTransfer.IToLocationType>(
        params: factory.transaction.moneyTransfer.IStartParamsWithoutDetail<T, T2>
    ): Promise<factory.transaction.moneyTransfer.ITransaction<T, T2>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引人プロフィール変更
     */
    public async setProfile(params: ISetProfileParams): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/agent`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params.agent
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        /**
         * 取引ID
         */
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとArgumentエラーが返されます。
     */
    public async cancel(params: {
        /**
         * 取引ID
         */
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引検索
     */
    public async search(
        params: factory.transaction.ISearchConditions<factory.transactionType.MoneyTransfer>
    ): Promise<ISearchResult<factory.transaction.ITransaction<factory.transactionType.MoneyTransfer>[]>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}`,
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

    /**
     * 取引に対するアクションを検索する
     */
    public async searchActionsByTransactionId(params: {
        /**
         * 取引ID
         */
        id: string;
        sort: factory.action.ISortOrder;
    }): Promise<factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[]> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/actions`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
