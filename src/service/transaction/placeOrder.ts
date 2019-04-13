import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';
import { TransactionService } from '../transaction';

/**
 * 注文取引サービス
 */
export class PlaceOrderTransactionService extends Service implements TransactionService {
    public typeOf: factory.transactionType.PlaceOrder = factory.transactionType.PlaceOrder;

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
        object?: {
            /**
             * WAITER許可証
             */
            passport?: {
                token: factory.waiter.passport.IEncodedPassport;
            };
        };
    }): Promise<factory.transaction.ITransaction<factory.transactionType.PlaceOrder>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 座席予約承認作成
     */
    public async authorizeSeatReservation(params: {
        object: factory.action.authorize.offer.seatReservation.IObjectWithoutDetail<factory.service.webAPI.Identifier.Chevre>;
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/offer/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * 座席予約承認取消
     */
    public async voidSeatReservation(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/offer/seatReservation/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 汎用決済承認
     * @deprecated Use service.Payment
     */
    public async authorizeAnyPayment<T extends factory.paymentMethodType>(params: {
        object: factory.action.authorize.paymentMethod.any.IObject<T>;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.any.IAction<T>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/any`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * 汎用決済承認取消
     * @deprecated Use service.Payment
     */
    public async voidAnyPayment(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/any/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * クレジットカードのオーソリを取得する
     * @deprecated Use service.Payment
     */
    public async authorizeCreditCardPayment(params: {
        object: factory.action.authorize.paymentMethod.creditCard.IObject;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.creditCard.IAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * 口座決済のオーソリを取得する
     * @deprecated Use service.Payment
     */
    public async authorizeAccountPayment<T extends factory.accountType>(params: {
        object: factory.action.authorize.paymentMethod.account.IObject<T>;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.account.IAction<T>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/account`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * ムビチケ承認
     * @deprecated Use service.Payment
     */
    public async authorizeMovieTicketPayment(params: {
        object: factory.action.authorize.paymentMethod.movieTicket.IObject;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/movieTicket`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * 決済承認取消
     * @deprecated Use service.Payment
     */
    public async voidPayment(params: {
        /**
         * アクションID
         */
        id: string;
        object: {
            /**
             * 決済方法
             */
            typeOf: factory.paymentMethodType;
        };
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<void> {
        await this.fetch({
            // tslint:disable-next-line:max-line-length
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/${params.object.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイントインセンティブのオーソリを取得する
     */
    public async authorizePointAward(params: {
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
    }): Promise<factory.action.authorize.award.point.IAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/award/accounts/point`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * ポイントインセンティブオーソリ取消
     */
    public async voidPointAward(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.award.point.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/award/accounts/point/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 購入者連絡先登録
     */
    public async setCustomerContact(params: {
        /**
         * 取引ID
         */
        id: string;
        object: {
            /**
             * customer contact info
             */
            customerContact: factory.transaction.placeOrder.ICustomerContact;
        };
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [OK],
            body: params.object.customerContact
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
        id: string;
        options?: {
            /**
             * 注文配送メールを送信するかどうか
             */
            sendEmailMessage?: boolean;
            /**
             * 注文配送メールテンプレート
             * メールをカスタマイズしたい場合、PUGテンプレートを指定
             * 挿入変数として`order`を使用できます
             * @see https://pugjs.org/api/getting-started.html
             * @example example/sendOrder.pug
             */
            emailTemplate?: string;
            /**
             * インセンティブとしてポイントを付与する場合、ポイント数と対象口座を指定
             */
            // incentives?: IIncentive[];
        };
    }): Promise<factory.transaction.placeOrder.IResult> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [OK],
            body: params.options
        })
            .then(async (response) => response.json());
    }

    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとArgumentエラーが返されます。
     */
    public async cancel(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/cancel`,
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
            uri: `/transactions/${this.typeOf}`,
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
     * 取引に対するアクションを検索する
     */
    public async searchActionsByTransactionId(params: {
        id: string;
        sort: factory.action.ISortOrder;
    }): Promise<factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[]> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/actions`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * ストリーミングダウンロード
     */
    public async stream(params: factory.transaction.ISearchConditions<factory.transactionType.PlaceOrder> & {
        format: factory.encodingFormat.Application | factory.encodingFormat.Text;
    }): Promise<NodeJS.ReadableStream | ReadableStream> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/report`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => <NodeJS.ReadableStream | ReadableStream>response.body);
    }
}
