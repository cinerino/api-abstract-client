import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';
import { ISetProfileParams, TransactionService } from '../transaction';

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
         * 購入者
         */
        agent?: {
            identifier?: factory.person.IIdentifier;
        };
        /**
         * 取引期限
         */
        expires: Date;
        object?: {
            /**
             * 顧客指定
             */
            customer?: {
                /**
                 * 顧客ID
                 */
                id?: string;
            };
            /**
             * WAITER許可証
             */
            passport?: {
                token: factory.waiter.passport.IEncodedPassport;
            };
        };
        /**
         * 販売者
         */
        seller: {
            typeOf: factory.organizationType;
            id: string;
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
     * 座席予約承認
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
     * ポイントインセンティブ承認
     */
    public async authorizePointAward(params: {
        object: {
            /**
             * 説明
             * 指定すると、口座の取引明細に記録されます。
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
     * ポイントインセンティブ承認取消
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
     * 取引人プロフィール変更
     */
    public async setProfile(params: ISetProfileParams): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/agent`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params.agent
        });
    }

    /**
     * 取引期限変更
     */
    public async changeExpiringDate(params: {
        /**
         * 取引ID
         */
        id: string;
        expires: Date;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/expires`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: factory.transaction.placeOrder.IConfirmParams & {
        /**
         * 注文配送メールを送信するかどうか
         */
        sendEmailMessage?: boolean;
        /**
         * 注文配送メールカスタマイズ
         * メール本文をカスタマイズしたい場合、PUGテンプレートを指定
         * 挿入変数として`order`を使用できます
         * 参考 -> https://pugjs.org/api/getting-started.html
         */
        email?: factory.creativeWork.message.email.ICustomization;
    }): Promise<factory.transaction.placeOrder.IResult> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [OK],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとArgumentエラーが返されます。
     */
    public async cancel(params: {
        /**
         * 取引ID
         */
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
                    data: await response.json()
                };
            });
    }

    /**
     * 取引に対するアクションを検索する
     */
    public async searchActionsByTransactionId(params: {
        /**
         * 取引ID
         */
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
