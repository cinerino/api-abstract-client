import * as factory from '@cinerino/factory';
import { OK } from 'http-status';

import { Service } from '../service';

export type IScreeningEventReservationOwnershipInfo =
    factory.ownershipInfo.IOwnershipInfo<factory.chevre.reservation.event.IReservation<factory.chevre.event.screeningEvent.IEvent>>;
/**
 * 予約サービス
 */
export class ReservationService extends Service {
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
        }).then(async (response) => response.json());
    }
}
