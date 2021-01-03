import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export interface IUseAction {
    id: string;
}

/**
 * 予約サービス
 */
export class ReservationService extends Service {
    /**
     * 予約検索
     */
    public async search<T extends factory.chevre.reservationType>(
        params: factory.chevre.reservation.ISearchConditions<T>
    ): Promise<{
        totalCount?: number;
        data: factory.chevre.reservation.IReservation<T>[];
    }> {
        return this.fetch({
            uri: '/reservations',
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
     * ストリーミングダウンロード
     */
    public async download<T extends factory.chevre.reservationType>(params: factory.chevre.reservation.ISearchConditions<T> & {
        format: any;
    }): Promise<NodeJS.ReadableStream | ReadableStream> {
        return this.fetch({
            uri: '/reservations/download',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => <NodeJS.ReadableStream | ReadableStream>response.body);
    }

    /**
     * 予約を使用する
     * 注文コードから取得したトークンを利用して、予約に入場記録を追加します
     */
    public async useByToken(params: {
        object: {
            /**
             * 予約ID
             */
            id?: string;
        };
        instrument: {
            /**
             * トークン
             * @see service.Token.getToken()
             */
            token: string;
        };
        location?: {
            /**
             * 入場ゲートコード
             */
            identifier?: string;
        };
    }): Promise<IUseAction | undefined> {
        return this.fetch({
            uri: '/reservations/use',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT, OK]
        })
            .then(async (response) => {
                if (response.status === OK) {
                    return <Promise<IUseAction>>response.json();
                } else {
                    return;
                }
            });
    }

    /**
     * 予約に対する入場アクションを検索する
     */
    public async searchUseActions(params: {
        object: {
            /**
             * 予約ID
             */
            id?: string;
        };
        startFrom?: Date;
        startThrough?: Date;
    }): Promise<ISearchResult<factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[]>> {
        return this.fetch({
            uri: `/reservations/${String(params.object.id)}/actions/use`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    data: await response.json()
                };
            });
    }

    /**
     * 予約使用アクション取消
     */
    public async cancelUseAction(params: {
        /**
         * アクションID
         */
        id: string;
        object: {
            /**
             * 予約ID
             */
            id?: string;
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/${String(params.object.id)}/actions/use/${String(params.id)}/${factory.actionStatusType.CanceledActionStatus}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 予約取消
     */
    public async cancel(params: factory.chevre.transaction.cancelReservation.IStartParamsWithoutDetail & {
        potentialActions?: factory.chevre.transaction.cancelReservation.IPotentialActionsParams;
    }): Promise<void> {
        await this.fetch({
            uri: '/reservations/cancel',
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 予約IDあるいは予約番号指定でチェックイン(発券)する
     * @deprecated じきに削除予定
     */
    public async checkIn(params: {
        id?: string;
        reservationNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: '/reservations/checkedIn',
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * @deprecated じきに削除予定
     */
    public async attend(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/${encodeURIComponent(String(params.id))}/attended`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
