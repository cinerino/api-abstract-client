import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

export type IMovieTheater = factory.place.movieTheater.IPlace;

/**
 * 場所サービス
 */
export class PlaceService extends Service {
    /**
     * 施設作成
     */
    public async createMovieTheater(
        params: IMovieTheater
    ): Promise<IMovieTheater> {
        return this.fetch({
            uri: `/places/${factory.placeType.MovieTheater}`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 施設検索
     */
    public async searchMovieTheaters(
        params: factory.place.movieTheater.ISearchConditions
    ): Promise<{
        data: factory.place.movieTheater.IPlaceWithoutScreeningRoom[];
    }> {
        return this.fetch({
            uri: `/places/${factory.placeType.MovieTheater}`,
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
     * 施設取得
     */
    public async findMovieTheaterById(params: {
        id: string;
    }): Promise<IMovieTheater> {
        return this.fetch({
            uri: `/places/${factory.placeType.MovieTheater}/${encodeURIComponent(String(params.id))}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 施設更新
     */
    public async updateMovieTheater(params: IMovieTheater): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.MovieTheater}/${encodeURIComponent(String(params.id))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 施設削除
     */
    public async deleteMovieTheater(params: {
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.MovieTheater}/${encodeURIComponent(String(params.id))}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ルーム作成
     */
    public async createScreeningRoom(params: factory.place.screeningRoom.IPlace): Promise<factory.place.screeningRoom.IPlace> {
        return this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoom}`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * ルーム検索
     */
    public async searchScreeningRooms(params: factory.place.screeningRoom.ISearchConditions): Promise<{
        data: factory.place.screeningRoom.IPlace[];
    }> {
        return this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoom}`,
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
     * ルーム更新
     */
    public async updateScreeningRoom(params: factory.place.screeningRoom.IPlace): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoom}/${encodeURIComponent(String(params.branchCode))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ルーム削除
     */
    public async deleteScreeningRoom(params: {
        project: { id: string };
        branchCode: string;
        containedInPlace: { branchCode: string };
    }): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoom}/${encodeURIComponent(String(params.branchCode))}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * セクション作成
     */
    public async createScreeningRoomSection(
        params: factory.place.screeningRoomSection.IPlace
    ): Promise<factory.place.screeningRoomSection.IPlace> {
        return this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoomSection}`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * セクション検索
     */
    public async searchScreeningRoomSections(params: factory.place.screeningRoomSection.ISearchConditions): Promise<{
        data: factory.place.screeningRoomSection.IPlace[];
    }> {
        return this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoomSection}`,
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
     * セクション更新
     */
    public async updateScreeningRoomSection(params: factory.place.screeningRoomSection.IPlace): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoomSection}/${encodeURIComponent(String(params.branchCode))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * セクション削除
     */
    public async deleteScreeningRoomSection(params: {
        project: { id: string };
        branchCode: string;
        containedInPlace: {
            branchCode: string;
            containedInPlace: {
                branchCode: string;
            };
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.ScreeningRoomSection}/${encodeURIComponent(String(params.branchCode))}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 座席作成
     */
    public async createSeat(params: factory.place.seat.IPlace): Promise<factory.place.seat.IPlace> {
        return this.fetch({
            uri: `/places/${factory.placeType.Seat}`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 座席検索
     */
    public async searchSeats(params: factory.place.seat.ISearchConditions): Promise<{
        data: factory.place.seat.IPlace[];
    }> {
        return this.fetch({
            uri: `/places/${factory.placeType.Seat}`,
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
     * 座席更新
     */
    public async updateSeat(params: factory.place.seat.IPlace): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.Seat}/${encodeURIComponent(String(params.branchCode))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 座席削除
     */
    public async deleteSeat(params: {
        project: { id: string };
        branchCode: string;
        containedInPlace: {
            branchCode: string;
            containedInPlace: {
                branchCode: string;
                containedInPlace: {
                    branchCode: string;
                };
            };
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/places/${factory.placeType.Seat}/${encodeURIComponent(String(params.branchCode))}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
