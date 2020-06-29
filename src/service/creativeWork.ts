import { OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * 作品サービス
 */
export class CreativeWorkService extends Service {
    /**
     * 映画作品検索
     */
    public async searchMovies(params: factory.chevre.creativeWork.movie.ISearchConditions): Promise<{
        totalCount?: number;
        data: factory.chevre.creativeWork.movie.ICreativeWork[];
    }> {
        return this.fetch({
            uri: '/creativeWorks/movie',
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
}
