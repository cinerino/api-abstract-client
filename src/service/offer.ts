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
     */
    public async authorizeMonetaryAmount(params: {
        object: factory.action.authorize.offer.monetaryAmount.IObject;
        purpose: IPurpose;
        // recipient: factory.action.authorize.offer.monetaryAmount.IRecipient;
    }): Promise<factory.action.authorize.offer.monetaryAmount.IAction> {
        return this.fetch({
            uri: `/offers/${params.object.itemOffered.typeOf}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        })
            .then(async (response) => response.json());
    }

    /**
     * プロダクトオファー承認
     */
    public async authorizeProduct(params: {
        object: factory.action.authorize.offer.product.IObject;
        purpose: IPurpose;
    }): Promise<factory.action.authorize.offer.product.IAction> {
        return this.fetch({
            uri: '/offers/product/authorize',
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
