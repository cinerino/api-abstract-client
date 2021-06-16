import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';

import { Service } from '../../service';

/**
 * 決済取引サービス
 */
export class PayAssetTransactionService extends Service {
    /**
     * 決済方法認証
     */
    public async check(
        params: factory.action.check.paymentMethod.movieTicket.IAttributes
    ): Promise<factory.action.check.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/assetTransactions/${factory.assetTransactionType.Pay}/check`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引開始
     */
    public async start(
        params: factory.assetTransaction.pay.IStartParamsWithoutDetail
    ): Promise<factory.assetTransaction.pay.ITransaction> {
        return this.fetch({
            uri: `/assetTransactions/${factory.assetTransactionType.Pay}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: factory.assetTransaction.pay.IConfirmParams): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/assetTransactions/${factory.assetTransactionType.Pay}/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.Pay}/${encodeURIComponent(String(params.id))}/confirm`,
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
                ? `/assetTransactions/${factory.assetTransactionType.Pay}/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.Pay}/${encodeURIComponent(String(params.id))}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
