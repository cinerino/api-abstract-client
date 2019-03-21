import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';
import { TransactionService } from '../transaction';

/**
 * 通貨転送取引サービス
 */
export class MoneyTransferTransactionService extends Service implements TransactionService {
    public typeOf: factory.transactionType.MoneyTransfer = factory.transactionType.MoneyTransfer;

    /**
     * 取引を開始する
     * 金額と転送先口座を指定して取引を開始します
     */
    public async start(
        params: factory.transaction.IStartParams<factory.transactionType.MoneyTransfer>
    ): Promise<factory.transaction.ITransaction<factory.transactionType.MoneyTransfer>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
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
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * 取引に対するアクションを検索する
     */
    public async searchActionsByTransactionId(params: {
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
