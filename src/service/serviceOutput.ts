import { OK } from 'http-status';

// import * as factory from '../factory';

import { Service } from '../service';

/**
 * サービスアウトプットサービス
 */
export class ServiceOutputService extends Service {
    /**
     * 検索
     */
    public async search(params: any): Promise<{
        data: any[];
    }> {
        return this.fetch({
            uri: '/serviceOutputs',
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
