import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';

import { IOptions } from '../../service';

import { PlaceOrderTransactionService } from './placeOrder';

/**
 * 承認アクションインターフェース
 */
export interface IAuthorizeAction {
    id: string;
}

/**
 * 注文取引サービス(sskts専用)
 */
export class PlaceOrderTransaction4ssktsService extends PlaceOrderTransactionService {
    constructor(options: IOptions) {
        super(options)/* istanbul ignore next */;
    }

    /**
     * 座席予約オファー承認
     */
    public async createSeatReservationAuthorization(params: {
        object: {
            /**
             * イベント
             */
            event: { id: string };
            /**
             * オファー
             */
            acceptedOffer: factory.offer.seatReservation.IOffer[];
        };
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                eventIdentifier: params.object.event.id,
                offers: params.object.acceptedOffer
            }
        })
            .then(async (response) => response.json());
    }

    /**
     * 座席予約オファー承認取消
     */
    public async cancelSeatReservationAuthorization(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/seatReservation/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 座席予約承認アクションの供給情報を変更する
     * 完了ステータスの座席仮予約に対して券種変更する際に使用
     */
    public async changeSeatReservationOffers(params: {
        /**
         * アクションID
         */
        id: string;
        object: {
            /**
             * イベント
             */
            event: { id: string };
            /**
             * オファー
             */
            acceptedOffer: factory.offer.seatReservation.IOffer[];
        };
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/seatReservation/${params.id}`,
            method: 'PATCH',
            expectedStatusCodes: [OK],
            body: {
                eventIdentifier: params.object.event.id,
                offers: params.object.acceptedOffer
            }
        })
            .then(async (response) => response.json());
    }
}
