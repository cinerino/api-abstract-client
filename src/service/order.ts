import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 注文サービス
 */
export class OrderService extends Service {
    /**
     * 確認番号で検索
     * 確認番号と購入者情報より、最新の注文を検索します
     */
    public async findByConfirmationNumber(params: {
        confirmationNumber: number;
        customer: {
            email?: string;
            telephone?: string;
        };
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: '/orders/findByConfirmationNumber',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * 所有権コードを発行する
     */
    public async authorizeOwnershipInfos(params: {
        orderNumber: string;
        customer: {
            email?: string;
            telephone?: string;
        };
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/orders/${params.orderNumber}/ownershipInfos/authorize`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * 注文を検索する
     */
    public async search(
        params: factory.order.ISearchConditions
    ): Promise<ISearchResult<factory.order.IOrder[]>> {
        return this.fetch({
            uri: '/orders',
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
}
