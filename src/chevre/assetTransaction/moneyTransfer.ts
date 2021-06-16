import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';

import { Service } from '../../service';

/**
 * 通貨転送取引サービス
 */
export class MoneyTransferAssetTransactionService extends Service {
    /**
     * 取引開始
     */
    public async start(
        params: factory.assetTransaction.moneyTransfer.IStartParamsWithoutDetail
    ): Promise<factory.assetTransaction.moneyTransfer.ITransaction> {
        return this.fetch({
            uri: `/assetTransactions/${factory.assetTransactionType.MoneyTransfer}/start`,
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
        id?: string;
        transactionNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/assetTransactions/${factory.assetTransactionType.MoneyTransfer}/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.MoneyTransfer}/${encodeURIComponent(String(params.id))}/confirm`,
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
                ? `/assetTransactions/${factory.assetTransactionType.MoneyTransfer}/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.MoneyTransfer}/${encodeURIComponent(String(params.id))}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
