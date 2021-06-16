import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

export import IPriceSpecification = factory.priceSpecification.IPriceSpecification;

/**
 * 価格仕様サービス
 */
export class PriceSpecificationService extends Service {
    public async create<T extends factory.priceSpecificationType>(
        params: IPriceSpecification<T>
    ): Promise<IPriceSpecification<T>> {
        return this.fetch({
            uri: '/priceSpecifications',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 価格仕様検索
     */
    public async search<T extends factory.priceSpecificationType>(
        params: factory.priceSpecification.ISearchConditions<T>
    ): Promise<{
        data: IPriceSpecification<T>[];
    }> {
        return this.fetch({
            uri: '/priceSpecifications',
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

    public async findById<T extends factory.priceSpecificationType>(params: {
        id: string;
    }): Promise<IPriceSpecification<T>> {
        return this.fetch({
            uri: `/priceSpecifications/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    public async update<T extends factory.priceSpecificationType>(
        params: IPriceSpecification<T>
    ): Promise<void> {
        await this.fetch({
            uri: `/priceSpecifications/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 価格仕様削除
     */
    public async deleteById(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/priceSpecifications/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
