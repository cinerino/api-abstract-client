import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * コンテンツサービス
 */
export class CreativeWorkService extends Service {
    public async createMovie(
        params: factory.creativeWork.movie.ICreativeWork
    ): Promise<factory.creativeWork.movie.ICreativeWork> {
        return this.fetch({
            uri: '/creativeWorks/movie',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    public async searchMovies(params: factory.creativeWork.movie.ISearchConditions): Promise<{
        data: factory.creativeWork.movie.ICreativeWork[];
    }> {
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

    public async findMovieById(params: {
        id: string;
    }): Promise<factory.creativeWork.movie.ICreativeWork> {
        return this.fetch({
            uri: `/creativeWorks/movie/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    public async updateMovie(params: factory.creativeWork.movie.ICreativeWork): Promise<void> {
        await this.fetch({
            uri: `/creativeWorks/movie/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    public async deleteMovie(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/creativeWorks/movie/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
