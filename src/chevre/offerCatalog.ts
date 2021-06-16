import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * オファーカタログサービス
 */
export class OfferCatalogService extends Service {
    /**
     * オファーカタログ作成
     */
    public async create(
        params: factory.offerCatalog.IOfferCatalog
    ): Promise<factory.offerCatalog.IOfferCatalog> {
        return this.fetch({
            uri: '/offerCatalogs',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * オファーカタログ検索
     */
    public async search(
        params: factory.offerCatalog.ISearchConditions
    ): Promise<ISearchResult<factory.offerCatalog.IOfferCatalog[]>> {
        return this.fetch({
            uri: '/offerCatalogs',
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

    public async findById(params: { id: string }): Promise<factory.offerCatalog.IOfferCatalog> {
        return this.fetch({
            uri: `/offerCatalogs/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * オファーカタログ更新
     */
    public async update(params: factory.offerCatalog.IOfferCatalog): Promise<void> {
        await this.fetch({
            uri: `/offerCatalogs/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * オファーカタログ削除
     */
    public async deleteById(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/offerCatalogs/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
