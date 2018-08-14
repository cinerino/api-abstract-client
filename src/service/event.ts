import * as factory from '@cinerino/factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * event service
 */
export class EventService extends Service {
    /**
     * 上映イベント検索
     */
    public async searchScreeningEvents(
        /**
         * 検索条件
         */
        params: factory.chevre.event.screeningEvent.ISearchConditions
    ): Promise<factory.chevre.event.screeningEvent.IEvent[]> {
        return this.fetch({
            uri: '/events/screeningEvent',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 上映イベント情報取得
     */
    public async findScreeningEventById(params: {
        /**
         * イベントID
         */
        eventId: string;
    }): Promise<factory.chevre.event.screeningEvent.IEvent> {
        return this.fetch({
            uri: `/events/screeningEvent/${params.eventId}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 上映イベントに対する券種検索
     */
    public async searchScreeningEventTicketTypes(params: {
        /**
         * イベントID
         */
        eventId: string;
    }): Promise<factory.chevre.ticketType.ITicketType[]> {
        return this.fetch({
            uri: `/events/screeningEvent/${params.eventId}/ticketTypes`,
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 上映イベントに対するオファー検索
     */
    public async searchScreeningEventOffers(params: {
        /**
         * イベントID
         */
        eventId: string;
    }): Promise<factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[]> {
        return this.fetch({
            uri: `/events/screeningEvent/${params.eventId}/offers`,
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }
}
