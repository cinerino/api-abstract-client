import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { Service } from '../../service';

/**
 * 予約キャンセル取引サービス
 */
export class CancelReservationAssetTransactionService extends Service {
    /**
     * 取引を開始する
     */
    public async start(
        params: factory.assetTransaction.cancelReservation.IStartParamsWithoutDetail
    ): Promise<factory.assetTransaction.cancelReservation.ITransaction> {
        return this.fetch({
            uri: '/assetTransactions/cancelReservation/start',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引開始&確定
     */
    public async startAndConfirm(params: factory.assetTransaction.cancelReservation.IStartParamsWithoutDetail & {
        potentialActions?: factory.assetTransaction.cancelReservation.IPotentialActionsParams;
    }): Promise<void> {
        await this.fetch({
            uri: '/assetTransactions/cancelReservation/confirm',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: factory.assetTransaction.cancelReservation.IConfirmParams): Promise<void> {
        await this.fetch({
            uri: `/assetTransactions/cancelReservation/${encodeURIComponent(String(params.id))}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: { id: string }): Promise<void> {
        await this.fetch({
            uri: `/assetTransactions/cancelReservation/${encodeURIComponent(String(params.id))}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
