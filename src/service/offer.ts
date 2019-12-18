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
     * 通貨転送オファー承認
     * 口座入金、ポイント購入等のオファー承認
     */
    public async authorizeMoneyTransfer<T extends factory.accountType>(params: {
        object: factory.action.authorize.offer.moneyTransfer.IObject<T>;
        purpose: IPurpose;
        recipient: factory.action.authorize.offer.moneyTransfer.IRecipient;
    }): Promise<factory.action.authorize.offer.moneyTransfer.IAction<T>> {
        return this.fetch({
            uri: `/offers/${params.object.typeOf}/authorize`,
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
            typeOf: string;
        };
        purpose: IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/offers/${params.object.typeOf}/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }
}
