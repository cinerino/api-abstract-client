import { OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * 経理レポートサービス
 */
export class AccountingReportService extends Service {
    /**
     * 検索
     */
    public async search(params: any): Promise<ISearchResult<any[]>> {
        return this.fetch({
            uri: '/accountingReports',
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
