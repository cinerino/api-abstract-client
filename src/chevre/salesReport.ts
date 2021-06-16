import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 売上レポートサービス
 */
export class SalesReportService extends Service {
    /**
     * 検索
     */
    public async search(params: {
        $and: any[];
    }): Promise<ISearchResult<factory.report.order.IReport[]>> {
        return this.fetch({
            uri: '/aggregateSales',
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
}
