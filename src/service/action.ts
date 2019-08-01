import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IAction<T extends factory.actionType> = factory.action.IAction<factory.action.IAttributes<T, any, any>>;

/**
 * アクションサービス
 */
export class ActionService extends Service {
    /**
     * アクション検索
     */
    public async search<T extends factory.actionType>(
        params: factory.action.ISearchConditions<T>
    ): Promise<ISearchResult<IAction<T>[]>> {
        return this.fetch({
            uri: '/actions',
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
