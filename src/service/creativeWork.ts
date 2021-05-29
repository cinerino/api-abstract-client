import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 作品サービス
 */
export class CreativeWorkService extends Service {
    /**
     * 映画作品検索
     */
    public async searchMovies(
        params: factory.creativeWork.movie.ISearchConditions
    ): Promise<ISearchResult<factory.creativeWork.movie.ICreativeWork[]>> {
        return this.fetch({
            uri: '/creativeWorks/movie',
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
