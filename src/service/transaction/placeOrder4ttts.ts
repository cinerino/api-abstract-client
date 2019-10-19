/**
 * 注文取引サービス
 */
import * as factory from '@cinerino/factory';
import { CREATED, NO_CONTENT } from 'http-status';

import { Service } from '../../service';

/**
 * クレジットカード承認アクションに必要なクレジットカード情報インターフェース
 */
export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw |
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized |
    factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;

/**
 * 承認アクションインターフェース
 */
export interface IAuthorizeAction {
    id: string;
}

export interface IConfirmResponse extends factory.transaction.placeOrder.IResult {
    printToken: string;
}

/**
 * 注文取引サービス
 */
export class PlaceOrderTransaction4tttsService extends Service {
    /**
     * 取引を開始する
     * 開始できない場合(混雑中など)、nullが返されます。
     */
    public async start(params: {
        /**
         * 取引期限
         * 指定した日時を過ぎると、取引を進行することはできなくなります。
         */
        expires: Date;
        /**
         * 販売者ID
         */
        sellerIdentifier: string;
        /**
         * WAITER許可証トークン
         * 指定しなければ、バックエンドで許可証を発行しにいく
         */
        passportToken?: string;
    }): Promise<factory.transaction.placeOrder.ITransaction> {
        return this.fetch({
            uri: `/ttts/transactions/${factory.transactionType.PlaceOrder}/start`,
            method: 'POST',
            body: {
                ...params,
                seller_identifier: params.sellerIdentifier
            },
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
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
            uri: `/ttts/transactions/${factory.transactionType.PlaceOrder}/${params.transactionId}/actions/authorize/seatReservation`,
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
            uri: `/ttts/transactions/${factory.transactionType.PlaceOrder}/${params.transactionId}/actions/authorize/seatReservation/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * register a customer contact
     */
    public async setCustomerContact(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 購入者プロフィール
         */
        contact: factory.transaction.placeOrder.ICustomerProfile;
    }): Promise<factory.transaction.placeOrder.ICustomerProfile> {
        return this.fetch({
            uri: `/ttts/transactions/${factory.transactionType.PlaceOrder}/${params.transactionId}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED],
            body: params.contact
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 決済方法
         */
        paymentMethod: factory.paymentMethodType;
        informOrderUrl?: string;
        informReservationUrl?: string;
    }): Promise<IConfirmResponse> {
        return this.fetch({
            uri: `/ttts/transactions/${factory.transactionType.PlaceOrder}/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                ...params,
                payment_method: params.paymentMethod
            }
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
            uri: `/ttts/transactions/${factory.transactionType.PlaceOrder}/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        })
            .then(async (response) => response.json());
    }
}
