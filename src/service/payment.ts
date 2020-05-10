import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

export import IPurpose = factory.action.authorize.paymentMethod.any.IPurpose;

/**
 * 決済サービス
 */
export class PaymentService extends Service {
    /**
     * 口座決済承認
     */
    public async authorizeAccount<T extends string>(params: {
        object: factory.action.authorize.paymentMethod.account.IObject<T>;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.account.IAction<T>> {
        return this.fetch({
            uri: `/payment/${factory.paymentMethodType.Account}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 汎用決済承認
     */
    public async authorizeAnyPayment<T extends factory.paymentMethodType>(params: {
        object: factory.action.authorize.paymentMethod.any.IObject<T>;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.any.IAction<T>> {
        return this.fetch({
            uri: `/payment/any/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * クレジットカードのオーソリを取得する
     */
    public async authorizeCreditCard(params: {
        object: factory.action.authorize.paymentMethod.creditCard.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.creditCard.IAction> {
        return this.fetch({
            uri: `/payment/${factory.paymentMethodType.CreditCard}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * ムビチケ承認
     */
    public async authorizeMovieTicket(params: {
        object: factory.action.authorize.paymentMethod.movieTicket.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/payment/${factory.paymentMethodType.MovieTicket}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 決済カード決済承認
     */
    public async authorizePaymentCard(params: {
        object: factory.action.authorize.paymentMethod.paymentCard.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.paymentCard.IAction> {
        return this.fetch({
            uri: `/payment/${factory.paymentMethodType.PaymentCard}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * ムビチケ購入番号確認
     */
    public async checkMovieTicket(
        params: factory.action.check.paymentMethod.movieTicket.IObject
    ): Promise<factory.action.check.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/payment/${factory.paymentMethodType.MovieTicket}/actions/check`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 決済カード照会
     */
    public async checkPaymentCard(params: {
        object: {
            typeOf: string;
            identifier: string;
            accessCode: string;
        };
    }): Promise<factory.chevre.paymentMethod.paymentCard.IPaymentCard> {
        return this.fetch({
            uri: `/payment/${factory.paymentMethodType.PaymentCard}/check`,
            method: 'POST',
            expectedStatusCodes: [OK],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 汎用決済承認取消
     */
    public async voidAnyPayment(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/payment/any/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 決済承認取消
     */
    public async voidTransaction(params: {
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
        purpose: IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/payment/${params.object.typeOf}/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
