import { OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

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
    ): Promise<{
        totalCount: number;
        data: IReservation<T>[];
    }> {
        return this.fetch({
            uri: '/reservations',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * トークンで予約照会
     */
    public async findScreeningEventReservationByToken<T extends factory.chevre.reservationType>(params: {
        token: string;
    }): Promise<IReservationOwnershipInfo<T>> {
        return this.fetch({
            uri: `/reservations/eventReservation/screeningEvent/findByToken`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
