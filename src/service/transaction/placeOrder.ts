import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';

/**
 * 承認アクションインターフェース
 */
export interface IAuthorizeAction {
    id: string;
}
export interface IAccount {
    /**
     * 口座タイプ
     */
    accountType: factory.accountType;
    /**
     * 口座番号
     */
    accountNumber: string;
}
export type ITokenizedAccount = string;
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
     */
    public async start(params: {
        /**
         * 取引期限
         */
        expires: Date;
        /**
         * 購入者
         */
        agent?: {
            identifier?: factory.person.IIdentifier;
        };
        /**
         * 販売者
         */
        seller: {
            typeOf: factory.organizationType;
            id: string;
        };
        object: {
            /**
             * WAITER許可証
             */
            passport?: {
                token: factory.waiter.passport.IEncodedPassport;
            };
        };
    }): Promise<factory.transaction.ITransaction<factory.transactionType.PlaceOrder>> {
        return this.fetch({
            uri: '/transactions/placeOrder/start',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 取引に座席予約を追加する
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
            body: params
        }).then(async (response) => response.json());
    }

    /**
     * 座席予約承認取消
     */
    public async voidSeatReservation(params: {
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/offer/seatReservation/${params.actionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * クレジットカードのオーソリを取得する
     */
    public async authorizeCreditCardPayment(params: factory.action.authorize.paymentMethod.creditCard.IObject & {
        /**
         * 取引ID
         */
        transactionId: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        }).then(async (response) => response.json());
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
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/creditCard/${params.actionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座決済のオーソリを取得する
     */
    public async authorizeAccountPayment(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 確保口座
         */
        fromAccount: IAccount | ITokenizedAccount;
        /**
         * 取引メモ
         * 指定すると、口座の取引明細に記録されます。
         * 後の調査のためにある程度の情報を記録することが望ましい。
         */
        notes?: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/account`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        }).then(async (response) => response.json());
    }

    /**
     * 口座決済オーソリ取消
     */
    public async voidAccountPayment(params: {
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/account/${params.actionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ムビチケ承認
     */
    public async authorizeMovieTicketPayment(params: factory.action.authorize.paymentMethod.movieTicket.IObject & {
        /**
         * 取引ID
         */
        transactionId: string;
    }): Promise<factory.action.authorize.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/movieTicket`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        }).then(async (response) => response.json());
    }

    /**
     * ムビチケ承認取消
     */
    public async voidMovieTicketPayment(params: {
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/movieTicket/${params.actionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイントインセンティブのオーソリを取得する
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/award/accounts/point`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        }).then(async (response) => response.json());
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
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/award/accounts/point/${params.actionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * Mocoin決済のオーソリを取得する
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
            body: params
        }).then(async (response) => response.json());
    }

    /**
     * 購入者連絡先登録
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
            expectedStatusCodes: [OK],
            body: params.contact
        }).then(async (response) => response.json());
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
            body: params
        }).then(async (response) => response.json());
    }
    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとArgumentエラーが返されます。
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
    /**
     * 取引検索
     */
    public async search(
        params: factory.transaction.ISearchConditions<factory.transactionType.PlaceOrder>
    ): Promise<ISearchResult<factory.transaction.ITransaction<factory.transactionType.PlaceOrder>[]>> {
        return this.fetch({
            uri: '/transactions/placeOrder',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }
    /**
     * 取引に対するアクションを検索する
     */
    public async searchActionsByTransactionId(params: {
        transactionId: string;
        sort: factory.action.ISortOrder;
    }): Promise<factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[]> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * レポートダウンロード
     */
    public async downloadReport(params: factory.transaction.ISearchConditions<factory.transactionType.PlaceOrder> & {
        format: factory.encodingFormat.Text;
    }): Promise<NodeJS.ReadableStream | ReadableStream> {
        return this.fetch({
            uri: '/transactions/placeOrder/report',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => <NodeJS.ReadableStream | ReadableStream>response.body);
    }
}
