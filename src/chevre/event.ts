import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * イベント+予約集計インターフェース
 */
export type IEventWithAggregateReservation<T extends factory.eventType> = factory.event.IEvent<T> & {
    saleTicketCount: number;
    preSaleTicketCount: number;
    freeTicketCount: number;
};

/**
 * イベントサービス
 */
export class EventService extends Service {
    /**
     * イベント作成
     */
    public async create<T extends factory.eventType>(
        params: factory.event.IAttributes<T> | factory.event.IAttributes<T>[]
    ): Promise<factory.event.IEvent<T>[]> {
        return this.fetch({
            uri: '/events',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベント検索
     */
    public async search<T extends factory.eventType>(
        params: factory.event.ISearchConditions<T>
    ): Promise<ISearchResult<factory.event.IEvent<T>[]>> {
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
    public async findById<T extends factory.eventType>(params: {
        id: string;
    }): Promise<factory.event.IEvent<T>> {
        return this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベント更新
     */
    public async update<T extends factory.eventType>(params: {
        id: string;
        attributes: factory.event.IAttributes<T>;
        upsert?: boolean;
    }): Promise<void> {
        await this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            qs: { upsert: params.upsert },
            body: params.attributes,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * イベント削除
     */
    public async deleteById(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * イベント部分更新
     */
    public async updatePartially<T extends factory.eventType>(params: {
        id: string;
        // attributes: factory.event.IAttributes<T>;
        attributes: {
            typeOf: T;
            eventStatus?: factory.eventStatusType;
            onUpdated?: {
                sendEmailMessage?: factory.action.transfer.send.message.email.IAttributes[];
            };
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}`,
            method: 'PATCH',
            body: params.attributes,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * イベントに対するオファー検索
     * @deprecated Use searchSeats
     */
    public async searchOffers(params: {
        id: string;
    }): Promise<factory.place.screeningRoomSection.IPlaceWithOffer[]> {
        return this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}/offers`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベントに対するチケットオファー検索
     */
    public async searchTicketOffers(params: {
        id: string;
    }): Promise<factory.event.screeningEvent.ITicketOffer[]> {
        return this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}/offers/ticket`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベントに対する座席検索
     */
    public async searchSeats(params: {
        id: string;
        limit?: number;
        page?: number;
    }): Promise<ISearchResult<factory.place.seat.IPlaceWithOffer[]>> {
        return this.fetch({
            uri: `/events/${encodeURIComponent(String(params.id))}/seats`,
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
     * 予約集計つきのデータ検索
     */
    public async searchWithAggregateReservation<T extends factory.eventType>(
        params: factory.event.ISearchConditions<T>
    ): Promise<ISearchResult<IEventWithAggregateReservation<T>[]>> {
        return this.fetch({
            uri: '/events/withAggregateReservation',
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
}
