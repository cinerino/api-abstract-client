import * as factory from '@cinerino/factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

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
/**
 * 注文インセンティブインターフェース
 */
// export interface IIncentive {
//     /**
//      * 付与ポイント数
//      */
//     amount: number;
//     /**
//      * 付与先口座番号
//      */
//     toAccountNumber: string;
// }

/**
 * 注文取引サービス
 */
export class PlaceOrderTransactionService extends Service {
    /**
     * 取引を開始する
     * 開始できない場合(混雑中など)、nullが返されます。
     * @returns 取引オブジェクト
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
        sellerId: string;
        /**
         * WAITER許可証トークン
         */
        passportToken?: string;
    }): Promise<factory.transaction.placeOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/placeOrder/start',
            method: 'POST',
            body: {
                expires: params.expires,
                sellerId: params.sellerId,
                passportToken: params.passportToken
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引に座席予約を追加する
     * @returns 座席予約承認アクション
     */
    public async authorizeSeatReservation(params: factory.chevre.transaction.reserve.IObjectWithoutDetail & {
        /**
         * 取引ID
         */
        transactionId: string;
    }): Promise<factory.action.authorize.offer.seatReservation.IAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/offer/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                event: params.event,
                notes: params.notes,
                tickets: params.tickets
            }
        });
    }

    /**
     * クレジットカードのオーソリを取得する
     * @returns 承認アクション
     */
    public async authorizeCreditCardPayment(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * オーダーID
         */
        orderId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 支払い方法
         */
        method: string;
        /**
         * クレジットカード情報
         */
        creditCard: ICreditCard;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                orderId: params.orderId,
                amount: params.amount,
                method: params.method,
                creditCard: params.creditCard
            }
        });
    }

    /**
     * クレジットカードオーソリ取消
     */
    public async voidCreditCardPayment(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/creditCard/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイント口座決済のオーソリを取得する
     * @returns 承認アクション
     */
    public async authorizePointPayment(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 引き出し元口座番号
         */
        fromAccountNumber: string;
        /**
         * 取引メモ
         * 指定すると、口座の取引明細に記録されます。
         * 後の調査のためにある程度の情報を記録することが望ましい。
         */
        notes?: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/point`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.amount,
                fromAccountNumber: params.fromAccountNumber,
                notes: params.notes
            }
        });
    }

    /**
     * ポイント口座決済オーソリ取消
     */
    public async voidPointPayment(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/point/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイントインセンティブのオーソリを取得する
     * @returns 承認アクション
     */
    public async authorizePointAward(params: {
        /**
         * 取引ID
         */
        transactionId: string;
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
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/award/point`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.amount,
                toAccountNumber: params.toAccountNumber,
                notes: params.notes
            }
        });
    }

    /**
     * ポイントインセンティブオーソリ取消
     */
    public async voidPointAward(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/award/point/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * Mocoin決済のオーソリを取得する
     * @returns 承認アクション
     */
    public async authorizeMocoinPayment(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 引き出し元口座番号
         */
        fromAccountNumber: string;
        /**
         * 取引メモ
         * 指定すると、口座の取引明細に記録されます。
         * 後の調査のためにある程度の情報を記録することが望ましい。
         */
        notes?: string;
        /**
         * 決済トークン
         * Mocoinユーザーのアクセストークンをセットしてください。
         */
        token: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/mocoin`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.amount,
                fromAccountNumber: params.fromAccountNumber,
                notes: params.notes,
                token: params.token
            }
        });
    }

    /**
     * 購入者連絡先登録
     * @returns 登録された購入者情報
     */
    public async setCustomerContact(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * customer contact info
         */
        contact: factory.transaction.placeOrder.ICustomerContact;
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED],
            body: params.contact
        });
    }

    /**
     * 取引確定
     * @returns 取引結果
     */
    public async confirm(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 注文メールを送信するかどうか
         * デフォルトはfalse
         */
        sendEmailMessage?: boolean;
        /**
         * インセンティブとしてポイントを付与する場合、ポイント数と対象口座を指定
         */
        // incentives?: IIncentive[];
    }): Promise<factory.transaction.placeOrder.IResult> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [OK],
            body: {
                sendEmailMessage: params.sendEmailMessage
                // incentives: params.incentives
            }
        });
    }
    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとArgumentエラーが返されます。
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
