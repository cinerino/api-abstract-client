import { OK } from 'http-status';

import * as factory from '../factory';

import { Service } from '../service';

/**
 * カテゴリーコードサービス
 */
export class CategoryCodeService extends Service {
    /**
     * 検索
     */
    public async search(params: factory.chevre.categoryCode.ISearchConditions): Promise<{
        data: factory.chevre.categoryCode.ICategoryCode[];
    }> {
        return this.fetch({
            uri: '/categoryCodes',
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
