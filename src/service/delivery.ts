import { NO_CONTENT } from 'http-status';

import { Service } from '../service';

/**
 * 配送サービス
 */
export class DeliveryService extends Service {
    /**
     * 注文を配送する
     * 作成された注文データに対して、同期的に注文を配送します(所有権が作成されます)
     * すでに配送済の場合、何もしません。
     */
    public async sendOrder(params: {
        /**
         * 注文番号
         */
        orderNumber: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/orders/${params.orderNumber}/deliver`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
