import { CREATED, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export interface IPublishIdentifierParams {
    project: { id: string };
}
export interface IPublishIdentifierResult {
    identifier: string;
}

/**
 * サービスアウトプットサービス
 */
export class ServiceOutputService extends Service {
    /**
     * 識別子発行
     */
    public async publishIdentifier(params: IPublishIdentifierParams[]): Promise<IPublishIdentifierResult[]> {
        return this.fetch({
            uri: '/serviceOutputs/identifier',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 検索
     */
    public async search(params: factory.product.IServiceOutputSearchConditions): Promise<ISearchResult<factory.product.IServiceOutput[]>> {
        return this.fetch({
            uri: '/serviceOutputs',
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
