import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * カテゴリーコードサービス
 */
export class CategoryCodeService extends Service {
    /**
     * 作成
     */
    public async create(params: factory.categoryCode.ICategoryCode): Promise<factory.categoryCode.ICategoryCode> {
        return this.fetch({
            uri: '/categoryCodes',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

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

    public async findById(params: { id: string }): Promise<factory.categoryCode.ICategoryCode> {
        return this.fetch({
            uri: `/categoryCodes/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    public async update(params: factory.categoryCode.ICategoryCode): Promise<void> {
        await this.fetch({
            uri: `/categoryCodes/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    public async deleteById(params: { id: string }): Promise<void> {
        await this.fetch({
            uri: `/categoryCodes/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
