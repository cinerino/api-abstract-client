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
     * 取引に座席予約を追加する
     */
    public async createSeatReservationAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * パフォーマンスID
         */
        performanceId: string;
        /**
         * 座席販売情報
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
     * 座席予約取消
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

    /**
     * 取引確定
     */
    public async confirm4ttts(params: factory.transaction.placeOrder.IConfirmParams): Promise<factory.transaction.placeOrder.IResult> {
        return this.fetch({
            uri: `/ttts/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 確定した取引に関して、購入者にメール通知を送信する
     */
    public async sendEmailNotification(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes;
    }): Promise<factory.task.ITask<factory.taskName.SendEmailMessage>> {
        return this.fetch({
            uri: `/ttts/transactions/${this.typeOf}/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        })
            .then(async (response) => response.json());
    }
}
