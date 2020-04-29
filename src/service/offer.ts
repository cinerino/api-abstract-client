import { CREATED, NO_CONTENT } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

export interface IPurpose {
    typeOf: factory.transactionType;
    id: string;
}

/**
 * オファーサービス
 */
export class OfferService extends Service {
    /**
     * 通貨オファー承認
     * 口座入金、ポイント購入等のオファー承認
     */
    public async authorizeMonetaryAmount<T extends string>(params: {
        object: factory.action.authorize.offer.monetaryAmount.IObject<T>;
        purpose: IPurpose;
        // recipient: factory.action.authorize.offer.monetaryAmount.IRecipient;
    }): Promise<factory.action.authorize.offer.monetaryAmount.IAction<T>> {
        return this.fetch({
            uri: `/offers/${params.object.itemOffered.typeOf}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * 会員プログラムオファー承認
     */
    public async authorizeProgramMembership(params: {
        object: factory.action.authorize.offer.programMembership.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.offer.programMembership.IAction> {
        return this.fetch({
            uri: `/offers/${params.object.itemOffered.typeOf}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * オファー承認取消
     */
    public async voidAuthorization(params: {
        /**
         * 承認アクションID
         */
        id: string;
        object: {
            itemOffered: {
                typeOf: string;
            };
        };
        purpose: IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/offers/${params.object.itemOffered.typeOf}/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
