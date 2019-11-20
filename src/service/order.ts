import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 注文サービス
 */
export class OrderService extends Service {
    /**
     * 注文を作成する
     * 確定した注文取引に対して、同期的に注文データを作成します。
     * すでに注文が作成済の場合、何もしません。
     */
    public async placeOrder(params: {
        /**
         * 注文番号
         */
        orderNumber: string;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: '/orders',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 確認番号で検索
     * 確認番号と購入者情報より、最新の注文を検索します
     */
    public async findByConfirmationNumber(params: {
        /**
         * 確認番号
         */
        confirmationNumber: number;
        /**
         * 購入者情報
         */
        customer: {
            email?: string;
            telephone?: string;
        };
        orderDateFrom?: Date;
        orderDateThrough?: Date;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: '/orders/findByConfirmationNumber',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 予約番号と電話番号で注文情報を取得する(sskts専用)
     */
    public async findByOrderInquiryKey4sskts(params: {
        theaterCode: string;
        confirmationNumber: number;
        telephone: string;
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: '/orders/findByOrderInquiryKey',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 所有権コードを発行する
     */
    public async authorizeOwnershipInfos(params: {
        /**
         * 注文番号
         */
        orderNumber: string;
        /**
         * 購入者情報
         */
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
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * ストリーミングダウンロード
     */
    public async download(params: factory.order.ISearchConditions & {
        format: factory.encodingFormat.Application | factory.encodingFormat.Text;
    }): Promise<NodeJS.ReadableStream | ReadableStream> {
        return this.fetch({
            uri: `/orders/download`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => <NodeJS.ReadableStream | ReadableStream>response.body);
    }
}
