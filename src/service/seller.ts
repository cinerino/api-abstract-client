import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type ISeller = factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;

/**
 * 販売者サービス
 */
export class SellerService extends Service {
    /**
     * 販売者作成
     */
    public async create<T extends factory.organizationType>(
        params: factory.seller.IAttributes<T>
    ): Promise<ISeller> {
        return this.fetch({
            uri: '/sellers',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 販売者取得
     */
    public async findById(params: {
        id: string;
    }): Promise<ISeller> {
        return this.fetch({
            uri: `/sellers/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 販売者検索
     */
    public async search(
        params: factory.seller.ISearchConditions
    ): Promise<ISearchResult<ISeller[]>> {
        return this.fetch({
            uri: '/sellers',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(<string>response.headers.get('X-Total-Count'))
                        : undefined,
                    data: await response.json()
                };
            });
    }

    /**
     * 販売者編集
     */
    public async update(params: {
        id: string;
        attributes: factory.seller.IAttributes<factory.organizationType>;
    }): Promise<void> {
        await this.fetch({
            uri: `/sellers/${params.id}`,
            method: 'PUT',
            body: params.attributes,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 販売者削除
     */
    public async deleteById(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/sellers/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
