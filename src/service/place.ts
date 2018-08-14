import * as factory from '@cinerino/factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * place service
 */
export class PlaceService extends Service {
    /**
     * 劇場検索
     */
    public async searchMovieTheaters(
        /**
         * 検索条件
         */
        params?: {}
    ): Promise<factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom[]> {
        return this.fetch({
            uri: '/places/movieTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 劇場情報取得
     */
    public async findMovieTheaterByBranchCode(params: {
        /**
         * 枝番号
         */
        branchCode: string;
    }): Promise<factory.chevre.place.movieTheater.IPlace> {
        return this.fetch({
            uri: `/places/movieTheater/${params.branchCode}`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
