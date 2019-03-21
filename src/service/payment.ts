import { CREATED, NO_CONTENT } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * 決済サービス
 */
export class PaymentService extends Service {
    /**
     * 口座決済承認
     */
    public async authorizeAccount<T extends factory.accountType>(params: {
        object: factory.action.authorize.paymentMethod.account.IObject<T>;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
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
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/payment/${params.object.typeOf}/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
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
}
