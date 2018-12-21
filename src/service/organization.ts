import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * organization service
 */
export class OrganizationService extends Service {
    /**
     * 劇場組織オープン
     */
    public async openMovieTheater(
        params: factory.organization.IAttributes<factory.organizationType.MovieTheater>
    ): Promise<factory.organization.IOrganization<factory.organizationType.MovieTheater>> {
        return this.fetch({
            uri: '/organizations/movieTheater',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }
    /**
     * 劇場組織をIDで取得
     */
    public async findMovieTheaterById(params: {
        id: string;
    }): Promise<factory.organization.IOrganization<factory.organizationType.MovieTheater>> {
        return this.fetch({
            uri: `/organizations/movieTheater/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * 劇場組織検索
     */
    public async searchMovieTheaters(
        params: factory.organization.ISearchConditions<factory.organizationType.MovieTheater>
    ): Promise<ISearchResult<factory.organization.IOrganization<factory.organizationType.MovieTheater>[]>> {
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
    /**
     * 劇場組織をIDで更新
     */
    public async updateMovieTheaterById(params: {
        id: string;
        attributes: factory.organization.IAttributes<factory.organizationType.MovieTheater>;
    }): Promise<void> {
        await this.fetch({
            uri: `/organizations/movieTheater/${params.id}`,
            method: 'PUT',
            body: params.attributes,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
    /**
     * 劇場組織をIDで削除
     */
    public async deleteMovieTheaterById(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/organizations/movieTheater/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
