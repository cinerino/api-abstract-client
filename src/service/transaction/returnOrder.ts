import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';
import { TransactionService } from '../transaction';

/**
 * 注文返品取引サービス
 */
export class ReturnOrderTransactionService extends Service implements TransactionService {
    public typeOf: factory.transactionType.ReturnOrder = factory.transactionType.ReturnOrder;

    /**
     * 取引を開始する
     */
    public async start(params: {
        /**
         * 返品者
         */
        agent?: {
            identifier?: factory.person.IIdentifier;
        };
        /**
         * 取引期限
         */
        expires: Date;
        object: {
            /**
             * 返品対象注文
             * 管理者として返品処理を実行する場合、個人情報は不要
             */
            order: factory.transaction.returnOrder.IReturnableOrder;
        };
    }): Promise<factory.transaction.ITransaction<factory.transactionType.ReturnOrder>> {
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
    public async confirm(params: factory.transaction.returnOrder.IConfirmParams): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引検索
     */
    public async search(
        params: factory.transaction.ISearchConditions<factory.transactionType.ReturnOrder>
    ): Promise<ISearchResult<factory.transaction.ITransaction<factory.transactionType.ReturnOrder>[]>> {
        return this.fetch({
            uri: '/transactions/returnOrder',
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
}
