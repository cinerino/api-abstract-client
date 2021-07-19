import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

export import IPurpose = factory.action.authorize.paymentMethod.any.IPurpose;

export interface IPublishPaymentUrlResult {
    paymentMethodId: string;
    paymentUrl: string;
}

/**
 * 決済サービス
 */
export class PaymentService extends Service {
    /**
     * 対面決済承認
     */
    public async authorizeAnyPayment(params: {
        object: factory.action.authorize.paymentMethod.any.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.any.IAction> {
        return this.fetch({
            uri: `/payment/${factory.service.paymentService.PaymentServiceType.FaceToFace}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * クレジットカード決済承認
     */
    public async authorizeCreditCard(params: {
        object: factory.action.authorize.paymentMethod.any.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.any.IAction> {
        return this.fetch({
            uri: `/payment/${factory.service.paymentService.PaymentServiceType.CreditCard}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * ムビチケ決済承認
     */
    public async authorizeMovieTicket(params: {
        object: factory.action.authorize.paymentMethod.any.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.any.IAction> {
        return this.fetch({
            uri: `/payment/${factory.service.paymentService.PaymentServiceType.MovieTicket}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * ペイメントカード決済承認
     */
    public async authorizePaymentCard(params: {
        object: factory.action.authorize.paymentMethod.any.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.any.IAction> {
        return this.fetch({
            uri: `/payment/${factory.product.ProductType.PaymentCard}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 決済ロケーション発行
     */
    public async publishCreditCardPaymentUrl(params: {
        object: factory.action.authorize.paymentMethod.any.IObject;
        purpose: IPurpose;
    }): Promise<IPublishPaymentUrlResult> {
        return this.fetch({
            uri: `/payment/${factory.service.paymentService.PaymentServiceType.CreditCard}/publishPaymentUrl`,
            method: 'POST',
            expectedStatusCodes: [OK],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * ムビチケ認証
     */
    public async checkMovieTicket(
        // params: factory.action.check.paymentMethod.movieTicket.IObject
        params: {
            typeOf: string;
            movieTickets: factory.action.check.paymentMethod.movieTicket.IMovieTicketResult[];
            /**
             * 販売者
             */
            seller: {
                typeOf: factory.organizationType;
                id: string;
            };
        }
    ): Promise<factory.action.check.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/payment/${factory.service.paymentService.PaymentServiceType.MovieTicket}/actions/check`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * ペイメントカード認証
     */
    public async checkPaymentCard(params: {
        object: {
            typeOf: string;
            identifier: string;
            accessCode: string;
        };
    }): Promise<factory.paymentMethod.paymentCard.IPaymentCard> {
        return this.fetch({
            uri: `/payment/${factory.product.ProductType.PaymentCard}/check`,
            method: 'POST',
            expectedStatusCodes: [OK],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 対面決済承認取消
     */
    public async voidAnyPayment(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/payment/${factory.service.paymentService.PaymentServiceType.FaceToFace}/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
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
             * 決済サービスタイプ
             */
            typeOf: factory.service.paymentService.PaymentServiceType | string;
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
