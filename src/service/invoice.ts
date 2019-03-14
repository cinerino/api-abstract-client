import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * インボイスサービス
 */
export class InvoiceService extends Service {
    /**
     * インボイスを検索する
     */
    public async search(params: factory.invoice.ISearchConditions): Promise<ISearchResult<factory.invoice.IInvoice[]>> {
        return this.fetch({
            uri: '/invoices',
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
}