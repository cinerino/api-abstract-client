import { CREATED } from 'http-status';

import { Service } from '../service';

/**
 * 取引番号サービス
 */
export class TransactionNumberService extends Service {
    /**
     * 発行
     */
    public async publish(params: { project: { id: string } }): Promise<{
        transactionNumber: string;
    }> {
        return this.fetch({
            uri: '/transactionNumbers',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }
}
