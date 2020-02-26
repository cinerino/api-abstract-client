import { OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * 場所サービス
 */
export class PlaceService extends Service {
    /**
     * 劇場検索
     */
    public async searchMovieTheaters(
        params: factory.chevre.place.movieTheater.ISearchConditions
    ): Promise<ISearchResult<factory.chevre.place.movieTheater.IPlaceWithoutScreeningRoom[]>> {
        return this.fetch({
            uri: `/places/${factory.chevre.placeType.MovieTheater}`,
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

    /**
     * スクリーン検索
     */
    public async searchScreeningRooms(params: {
        limit?: number;
        page?: number;
        /**
         * スクリーンコード
         */
        branchCode?: {
            $eq?: string;
        };
        /**
         * 劇場条件
         */
        containedInPlace?: {
            /**
             * 劇場コード
             */
            branchCode?: {
                $eq: string;
            };
        };
    }): Promise<ISearchResult<factory.chevre.place.screeningRoom.IPlace[]>> {
        return this.fetch({
            uri: `/places/${factory.chevre.placeType.ScreeningRoom}`,
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

    /**
     * 座席検索
     */
    public async searchSeats(params: {
        limit?: number;
        page?: number;
        /**
         * 座席コード
         */
        branchCode?: {
            $eq?: string;
        };
        /**
         * セクション条件
         */
        containedInPlace?: {
            /**
             * スクリーン条件
             */
            containedInPlace?: {
                /**
                 * 劇場条件
                 */
                containedInPlace?: {
                    /**
                     * 劇場コード
                     */
                    branchCode?: {
                        $eq?: string;
                    };
                };
            };
        };
    }): Promise<ISearchResult<factory.chevre.place.seat.IPlace[]>> {
        return this.fetch({
            uri: `/places/${factory.chevre.placeType.Seat}`,
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
