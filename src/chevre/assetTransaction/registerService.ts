import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { Service } from '../../service';

/**
 * サービス登録取引サービス
 */
export class RegisterServiceAssetTransactionService extends Service {
    /**
     * 取引開始
     */
    public async start(
        params: factory.assetTransaction.registerService.IStartParamsWithoutDetail
    ): Promise<factory.assetTransaction.registerService.ITransaction> {
        return this.fetch({
            uri: `/assetTransactions/${factory.assetTransactionType.RegisterService}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: factory.assetTransaction.registerService.IConfirmParams): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/assetTransactions/${factory.assetTransactionType.RegisterService}/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.RegisterService}/${encodeURIComponent(String(params.id))}/confirm`,
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
                ? `/assetTransactions/${factory.assetTransactionType.RegisterService}/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/assetTransactions/${factory.assetTransactionType.RegisterService}/${encodeURIComponent(String(params.id))}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
