import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * IAMサービス
 */
export class IAMService extends Service {
    /**
     * IAMメンバー検索
     */
    public async searchMembers(params: factory.iam.ISearchConditions): Promise<ISearchResult<factory.iam.IMember[]>> {
        return this.fetch({
            uri: '/iam/members',
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
