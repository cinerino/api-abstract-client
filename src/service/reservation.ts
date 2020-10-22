import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IReservation<T extends factory.chevre.reservationType> = factory.chevre.reservation.IReservation<T>;
export type IReservationOwnershipInfo<T extends factory.chevre.reservationType> = factory.ownershipInfo.IOwnershipInfo<IReservation<T>>;

/**
 * 予約サービス
 */
export class ReservationService extends Service {
    /**
     * 予約検索
     */
    public async search<T extends factory.chevre.reservationType>(
        params: factory.chevre.reservation.ISearchConditions<T>
    ): Promise<ISearchResult<IReservation<T>[]>> {
        return this.fetch({
            uri: '/reservations',
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
     * トークンで予約照会
     */
    public async findScreeningEventReservationByToken(params: {
        token: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/eventReservation/screeningEvent/findByToken`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT, OK]
        });
    }

    /**
     * 予約を使用する
     */
    public async useByToken(params: {
        object: {
            id?: string;
        };
        instrument: {
            token: string;
        };
    }): Promise<void> {
        await this.fetch({
            uri: '/reservations/use',
            method: 'POST',
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
     * @deprecated
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
