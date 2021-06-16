import { NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * 注文サービス
 */
export class OrderService extends Service {
    /**
     * なければ作成する
     */
    public async createIfNotExist(params: factory.order.IOrder): Promise<void> {
        await this.fetch({
            uri: `/orders/${params.orderNumber}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 注文配送
     */
    public async deliverOrder(params: {
        orderNumber: string;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/orders/${params.orderNumber}/${factory.orderStatus.OrderDelivered}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 注文返品
     */
    public async returnOrder(params: {
        orderNumber: string;
        dateReturned: Date;
        returner: factory.order.IReturner;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/orders/${params.orderNumber}/${factory.orderStatus.OrderReturned}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 注文を検索する
     */
    public async search(params: factory.order.ISearchConditions): Promise<ISearchResult<factory.order.IOrder[]>> {
        return this.fetch({
            uri: '/orders',
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
     * 注文取得
     */
    public async findByOrderNumber(params: {
        /**
         * 注文番号
         */
        orderNumber: string;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/orders/${params.orderNumber}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 注文に対するアクションを検索する
     */
    public async searchActionsByOrderNumber(params: {
        /**
         * 注文番号
         */
        orderNumber: string;
        sort: factory.action.ISortOrder;
    }): Promise<factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[]> {
        return this.fetch({
            uri: `/orders/${params.orderNumber}/actions`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
