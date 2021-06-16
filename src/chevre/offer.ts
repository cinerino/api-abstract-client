import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * オファーサービス
 */
export class OfferService extends Service {
    /**
     * オファー作成
     */
    public async create(
        params: factory.offer.IUnitPriceOffer
    ): Promise<factory.offer.IUnitPriceOffer> {
        return this.fetch({
            uri: '/offers',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * オファー検索
     */
    public async search(
        params: factory.offer.ISearchConditions
    ): Promise<ISearchResult<factory.offer.IUnitPriceOffer[]>> {
        return this.fetch({
            uri: '/offers',
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

    public async findById(params: { id: string }): Promise<factory.offer.IUnitPriceOffer> {
        return this.fetch({
            uri: `/offers/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * オファー更新
     */
    public async update(params: factory.offer.IUnitPriceOffer): Promise<void> {
        await this.fetch({
            uri: `/offers/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * オファー削除
     */
    public async deleteById(params: { id: string }): Promise<void> {
        await this.fetch({
            uri: `/offers/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
