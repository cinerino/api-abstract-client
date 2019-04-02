import { OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

export type IScreeningEventReservation = factory.chevre.reservation.IReservation<factory.chevre.reservationType.EventReservation>;
export type IScreeningEventReservationOwnershipInfo = factory.ownershipInfo.IOwnershipInfo<IScreeningEventReservation>;

/**
 * 予約サービス
 */
export class ReservationService extends Service {
    /**
     * 上映イベント予約検索
     */
    public async searchScreeningEventReservations(
        params: factory.chevre.reservation.ISearchConditions<factory.chevre.reservationType.EventReservation>
    ): Promise<{
        totalCount: number;
        data: IScreeningEventReservation[];
    }> {
        return this.fetch({
            uri: '/reservations/eventReservation/screeningEvent',
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
     * トークンで上映イベント予約照会
     */
    public async findScreeningEventReservationByToken(params: {
        token: string;
    }): Promise<IScreeningEventReservationOwnershipInfo> {
        return this.fetch({
            uri: `/reservations/eventReservation/screeningEvent/findByToken`,
            method: 'POST',
            body: { token: params.token },
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
