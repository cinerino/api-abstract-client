import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 経理レポートサービス
 */
export class AccountingReportService extends Service {
    /**
     * 検索
     */
    public async search(
        params: factory.report.accountingReport.ISearchConditions
    ): Promise<ISearchResult<factory.report.accountingReport.IReport[]>> {
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
