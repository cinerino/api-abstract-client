import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * COA券種オファーインターフェース
 */
export interface ICOATicketOffer {
    /**
     * チケットコード
     */
    ticketCode: string;
    /**
     * チケット名
     */
    ticketName: string;
    /**
     * チケット名（カナ）
     */
    ticketNameKana: string;
    /**
     * チケット名（英）
     */
    ticketNameEng: string;
    /**
     * 標準単価
     */
    stdPrice: number;
    /**
     * 加算単価(３Ｄ，ＩＭＡＸ、４ＤＸ等の加算料金)
     */
    addPrice: number;
    /**
     * 販売単価(標準単価＋加算単価)
     */
    salePrice: number;
    /**
     * 人数制限(制限が無い場合は１)
     */
    limitCount: number;
    /**
     * 制限単位(１：ｎ人単位、２：ｎ人以上)
     */
    limitUnit: string;
    /**
     * チケット備考(注意事項等)
     */
    ticketNote: string;
    /**
     * メガネ単価
     */
    addGlasses: number;
    /**
     * 会員用フラグ（1：会員専用チケットも表示する。会員以外の場合は0をセット）
     */
    flgMember: '0' | '1';
    /**
     * ポイント購入の場合の消費ポイント
     */
    usePoint: number;
    /**
     * ムビチケ券種フラグ
     */
    flgMvtk: boolean;
    /**
     * ムビチケ計上単価
     */
    mvtkAppPrice: number;
    /**
     * ムビチケ映写方式区分
     */
    kbnEisyahousiki: string;
    /**
     * ムビチケ電子券区分
     */
    mvtkKbnDenshiken: string;
    /**
     * ムビチケ前売券区分
     */
    mvtkKbnMaeuriken: string;
    /**
     * ムビチケ券種区分
     */
    mvtkKbnKensyu: string;
    /**
     * ムビチケ販売単価
     */
    mvtkSalesPrice: number;
}

/**
 * イベントサービス
 */
export class EventService extends Service {
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
            uri: `/events/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * イベント更新
     */
    public async updatePartially(params: {
        id: string;
        eventStatus?: factory.eventStatusType;
        onUpdated?: {
            sendEmailMessage?: factory.action.transfer.send.message.email.IAttributes[];
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/events/${params.id}`,
            method: 'PATCH',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * イベントに対する座席検索
     */
    public async searchSeats(params: {
        /**
         * イベント
         */
        event: { id: string };
        limit?: number;
        page?: number;
    }): Promise<ISearchResult<factory.place.seat.IPlaceWithOffer[]>> {
        return this.fetch({
            uri: `/events/${params.event.id}/seats`,
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
    }): Promise<factory.event.screeningEvent.ITicketOffer[]> {
        return this.fetch({
            uri: `/events/${params.event.id}/offers/ticket`,
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        })
            .then(async (response) => response.json());
    }

    /**
     * イベントに対する券種オファー検索(COA券種)
     */
    public async searchTicketOffers4COA(params: {
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
        /**
         * ムビチケ券種もほしい場合に指定
         */
        movieTicket?: {
            /**
             * 電子券区分
             */
            kbnDenshiken: string;
            /**
             * 前売券区分
             */
            kbnMaeuriken: string;
            /**
             * 券種区分
             */
            kbnKensyu: string;
            /**
             * 販売単価
             */
            salesPrice: number;
            /**
             * 計上単価
             */
            appPrice: number;
            /**
             * 映写方式区分
             */
            kbnEisyahousiki: string;
        };
    }): Promise<ICOATicketOffer[]> {
        return this.fetch({
            uri: `/events/${params.event.id}/offers/ticket`,
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        })
            .then(async (response) => response.json());
    }
}
