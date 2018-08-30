import * as factory from '@cinerino/factory';
import { OK } from 'http-status';

import { ISearchResult, Service } from '../service';

/**
 * organization service
 */
export class OrganizationService extends Service {
    /**
     * 劇場組織検索
     */
    public async searchMovieTheaters(
        params: factory.organization.movieTheater.ISearchConditions
    ): Promise<ISearchResult<factory.organization.movieTheater.IOrganization[]>> {
        return this.fetch({
            uri: '/organizations/movieTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }
}
