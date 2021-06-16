import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';

import { Service } from '../../service';

/**
 * 返金取引サービス
 */
export class RefundAssetTransactionService extends Service {
    /**
     * 取引開始
     */
    public async start(
        params: factory.assetTransaction.refund.IStartParamsWithoutDetail
    ): Promise<factory.assetTransaction.refund.ITransaction> {
        return this.fetch({
            uri: `/assetTransactions/${factory.assetTransactionType.Refund}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: factory.assetTransaction.refund.IConfirmParams): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/assetTransactions/${factory.assetTransactionType.Refund}/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.Refund}/${encodeURIComponent(String(params.id))}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        id?: string;
        transactionNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/assetTransactions/${factory.assetTransactionType.Refund}/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.Refund}/${encodeURIComponent(String(params.id))}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
