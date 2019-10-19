import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * イベントサービス
 */
export class EventService extends Service {
    /**
     * イベント検索
     */
    public async search<T extends factory.chevre.eventType>(
        params: factory.chevre.event.ISearchConditions<T>
    ): Promise<ISearchResult<factory.chevre.event.IEvent<T>[]>> {
        return this.fetch({
            uri: '/events',
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
     * イベント取得
     */
    public async findById<T extends factory.chevre.eventType>(params: {
        id: string;
    }): Promise<factory.chevre.event.IEvent<T>> {
        return this.fetch({
            uri: `/events/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベントに対する座席オファー検索
     */
    public async searchOffers(params: {
        /**
         * イベント
         */
        event: { id: string };
    }): Promise<factory.chevre.event.screeningEvent.IScreeningRoomSectionOffer[]> {
        return this.fetch({
            uri: `/events/${params.event.id}/offers`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベントに対する券種オファー検索
     */
    public async searchTicketOffers(params: {
        /**
         * イベント
         */
        event: { id: string };
        /**
         * 販売者
         */
        seller: { typeOf: factory.organizationType; id: string };
        /**
         * 店舗(idにはアプリケーションクライアントIDを指定)
         */
        store: { id: string };
    }): Promise<factory.chevre.event.screeningEvent.ITicketOffer[]> {
        return this.fetch({
            uri: `/events/${params.event.id}/offers/ticket`,
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 上映イベント検索
     * @deprecated Use search()
     */
    public async searchScreeningEvents(
        params: factory.chevre.event.screeningEvent.ISearchConditions
    ): Promise<ISearchResult<factory.chevre.event.screeningEvent.IEvent[]>> {
        return this.fetch({
            uri: '/events/screeningEvent',
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
     * 上映イベント取得
     * @deprecated Use findById()
     */
    public async findScreeningEventById(params: {
        id: string;
    }): Promise<factory.chevre.event.screeningEvent.IEvent> {
        return this.fetch({
            uri: `/events/screeningEvent/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 上映イベントに対する座席オファー検索
     * @deprecated Use searchOffers()
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
        })
            .then(async (response) => response.json());
    }

    /**
     * 上映イベントに対する券種オファー検索
     * @deprecated Use searchTicketOffers()
     */
    public async searchScreeningEventTicketOffers(params: {
        /**
         * イベント
         */
        event: { id: string };
        /**
         * 販売者
         */
        seller: { typeOf: factory.organizationType; id: string };
        /**
         * 店舗(idにはアプリケーションクライアントIDを指定)
         */
        store: { id: string };
    }): Promise<factory.chevre.event.screeningEvent.ITicketOffer[]> {
        return this.fetch({
            uri: `/events/screeningEvent/${params.event.id}/offers/ticket`,
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        })
            .then(async (response) => response.json());
    }
}
