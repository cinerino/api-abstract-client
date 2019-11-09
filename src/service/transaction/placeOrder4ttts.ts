import { CREATED, NO_CONTENT } from 'http-status';

import * as factory from '../../factory';

import { IOptions } from '../../service';

import { PlaceOrderTransactionService } from './placeOrder';

/**
 * 注文取引サービス(ttts専用)
 */
export class PlaceOrderTransaction4tttsService extends PlaceOrderTransactionService {
    constructor(options: IOptions) {
        super(options)/* istanbul ignore next */;
    }

    /**
     * 座席予約承認
     */
    public async createSeatReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * イベントID
         */
        performanceId: string;
        /**
         * オファー
         */
        offers: {
            seat_code?: string;
            ticket_type: string;
            watcher_name: string;
        }[];
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.Chevre>> {
        return this.fetch({
            uri: `/ttts/transactions/${this.typeOf}/${params.transactionId}/actions/authorize/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                performance_id: params.performanceId,
                offers: params.offers
            }
        })
            .then(async (response) => response.json());
    }

    /**
     * 座席予約承認取消
     */
    public async cancelSeatReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/ttts/transactions/${this.typeOf}/${params.transactionId}/actions/authorize/seatReservation/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
