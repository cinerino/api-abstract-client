/**
 * 注文返品取引サービス
 */
import * as factory from '@cinerino/factory';
import { CREATED, OK } from 'http-status';

import { Service } from '../../service';

/**
 * 注文返品取引サービス
 */
export class ReturnOrderTransactionService extends Service {
    /**
     * 取引を開始する
     * @returns 注文返品取引オブジェクト
     */
    public async start(params: {
        /**
         * 取引期限
         * 指定した日時を過ぎると、取引を進行することはできなくなります。
         */
        expires: Date;
        /**
         * 返品したい注文取引ID
         */
        transactionId: string;
    }): Promise<factory.transaction.returnOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/returnOrder/start',
            method: 'POST',
            body: {
                expires: params.expires,
                transactionId: params.transactionId
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引確定
     * @returns 注文返品取引結果
     */
    public async confirm(params: {
        /**
         * 返品取引ID
         */
        transactionId: string;
    }): Promise<factory.transaction.returnOrder.IResult> {
        return this.fetch({
            uri: `/transactions/returnOrder/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED]
        });
    }
}
