import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

export type IUseAction = factory.action.consume.use.reservation.IAction;

/**
 * 予約サービス
 */
export class ReservationService extends Service {
    /**
     * 予約検索
     */
    public async search<T extends factory.reservationType>(
        params: factory.reservation.ISearchConditions<T>
    ): Promise<ISearchResult<factory.reservation.IReservation<T>[]>> {
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
     * 予約取得
     */
    public async findById<T extends factory.reservationType>(params: {
        id: string;
    }): Promise<factory.reservation.IReservation<T>> {
        return this.fetch({
            uri: `/reservations/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 予約部分更新
     */
    public async update(params: {
        id: string;
        update: any;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/${encodeURIComponent(String(params.id))}`,
            method: 'PATCH',
            body: params.update,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 予約に対する使用アクション検索
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
            uri: `/reservations/${String(params.object?.id)}/actions/use`,
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
     * 予約IDあるいは予約番号指定でチェックイン(発券)する
     */
    public async checkInScreeningEventReservations(params: {
        id?: string;
        reservationNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/reservations/eventReservation/screeningEvent/checkedIn`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 予約を使用する(入場する)
     */
    public async use(params: {
        agent?: any;
        instrument?: { token?: string };
        location?: { identifier?: string };
        object: { id: string };
    }): Promise<void | IUseAction> {
        return this.fetch({
            uri: `/reservations/eventReservation/screeningEvent/${encodeURIComponent(String(params.object.id))}/attended`,
            method: 'PUT',
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
}
