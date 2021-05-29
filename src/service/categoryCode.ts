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
    public async search(params: factory.categoryCode.ISearchConditions): Promise<{
        data: factory.categoryCode.ICategoryCode[];
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
