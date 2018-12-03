import { NO_CONTENT } from 'http-status';

import { Service } from '../service';

/**
 * 配送サービス
 */
export class DeliveryService extends Service {
    /**
     * 注文を配送する
     */
    public async sendOrder(params: { orderNumber: string }): Promise<void> {
        await this.fetch({
            uri: `/orders/${params.orderNumber}/deliver`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
