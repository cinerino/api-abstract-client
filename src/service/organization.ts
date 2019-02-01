import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type ISeller = factory.seller.IOrganization<factory.seller.IAttributes<factory.organizationType>>;

/**
 * 組織サービス
 * @deprecated Use SellerService. 販売者サービスを使用してください
 */
export class OrganizationService extends Service {
    /**
     * 劇場組織取得
     * @deprecated Use SellerService.findById()
     */
    public async findMovieTheaterById(params: {
        id: string;
    }): Promise<ISeller> {
        return this.fetch({
            uri: `/organizations/movieTheater/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 劇場組織検索
     * @deprecated Use SellerService.search()
     */
    public async searchMovieTheaters(
        params: factory.seller.ISearchConditions
    ): Promise<ISearchResult<ISeller[]>> {
        return this.fetch({
            uri: '/organizations/movieTheater',
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
