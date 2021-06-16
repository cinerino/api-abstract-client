import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { Service } from '../../service';

/**
 * 予約取引サービス
 */
export class ReserveAssetTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start(
        params: factory.assetTransaction.reserve.IStartParamsWithoutDetail
    ): Promise<factory.assetTransaction.reserve.ITransaction> {
        return this.fetch({
            uri: '/assetTransactions/reserve/start',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    public async startWithNoResponse(params: factory.assetTransaction.reserve.IStartParamsWithoutDetail): Promise<void> {
        await this.fetch({
            uri: '/assetTransactions/reserve/start',
            method: 'POST',
            body: params,
            qs: { expectsNoContent: '1' },
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: factory.assetTransaction.reserve.IConfirmParams): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/assetTransactions/reserve/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/assetTransactions/reserve/${encodeURIComponent(String(params.id))}/confirm`,
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
                ? `/assetTransactions/reserve/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/assetTransactions/reserve/${encodeURIComponent(String(params.id))}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
