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
    public typeOf: factory.transactionType.PlaceOrder = factory.transactionType.PlaceOrder;

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

    /**
     * ムビチケ決済承認
     */
    public async createMvtkAuthorization(params: {
        object: factory.action.authorize.discount.mvtk.IObject;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/mvtk`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * ムビチケ決済承認取消
     */
    public async cancelMvtkAuthorization(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/mvtk/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイントインセンティブ承認
     */
    public async createPecorinoAwardAuthorization(params: {
        object: {
            /**
             * 金額
             */
            amount: number;
            /**
             * 入金先口座番号
             */
            toAccountNumber: string;
            /**
             * 取引メモ
             * 指定すると、口座の取引明細に記録されます。
             * 後の調査のためにある程度の情報を記録することが望ましい。
             */
            notes?: string;
        };
        purpose: factory.action.authorize.award.point.IPurpose;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/award/pecorino`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.object.amount,
                toAccountNumber: params.object.toAccountNumber,
                notes: params.object.notes
            }
        })
            .then(async (response) => response.json());
    }

    /**
     * ポイントインセンティブ承認取消
     */
    public async cancelPecorinoAwardAuthorization(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.award.point.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/award/pecorino/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * 注文配送メールを送信するかどうか
         */
        sendEmailMessage?: boolean;
        /**
         * 注文配送メール
         */
        email?: {
            /**
             * 注文配送メールテンプレート
             * メールをカスタマイズしたい場合、PUGテンプレートを指定
             * 挿入変数として`order`を使用できます
             * @see https://pugjs.org/api/getting-started.html
             * @example example/sendOrder.pug
             */
            template?: string;
            /**
             * 注文配送メール送信者
             */
            sender?: { email?: string };
        };
    }): Promise<factory.transaction.placeOrder.IResult & factory.order.IOrder> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }
}
