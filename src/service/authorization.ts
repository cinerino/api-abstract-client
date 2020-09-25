import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 認可サービス
 */
export class AuthorizationService extends Service {
    /**
     * 認可検索
     */
    public async search(
        params: factory.authorization.ISearchConditions
    ): Promise<ISearchResult<factory.authorization.IAuthorization[]>> {

        return this.fetch({
            uri: '/authorizations',
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
