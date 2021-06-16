import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IOwnershipInfo = factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGood | factory.ownershipInfo.IGoodWithDetail>;

/**
 * 所有権サービス
 */
export class OwnershipInfoService extends Service {
    /**
     * 所有権発行
     */
    public async saveByIdentifier(params: IOwnershipInfo): Promise<IOwnershipInfo> {
        return this.fetch({
            uri: '/ownershipInfos/saveByIdentifier',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 所有権検索
     */
    public async search(params: factory.ownershipInfo.ISearchConditions & {
        countDocuments?: '1';
        /**
         * 所有物詳細を取得する
         */
        includeGoodWithDetails?: '1';
        ownedFromGte?: Date;
        ownedFromLte?: Date;
    }): Promise<ISearchResult<IOwnershipInfo[]>> {
        return this.fetch({
            uri: '/ownershipInfos',
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
     * 所有権変更
     */
    public async updateByIdentifier(params: {
        project: { id: string };
        identifier: string;
        ownedThrough?: Date;
    }): Promise<void> {
        await this.fetch({
            uri: '/ownershipInfos/updateByIdentifier',
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
