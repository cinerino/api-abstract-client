import { CREATED, OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * 決済方法サービス
 */
export class PaymentMethodService extends Service {
    /**
     * ムビチケを検索する
     */
    public async searchMovieTickets(
        params: factory.paymentMethod.ISearchConditions<factory.paymentMethodType.MovieTicket>
    ): Promise<ISearchResult<factory.paymentMethod.paymentCard.movieTicket.IMovieTicket[]>> {
        return this.fetch({
            uri: `/paymentMethods/${factory.paymentMethodType.MovieTicket}`,
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
     * プリペイドカード作成
     */
    public async createPrepaidCard(
        params: factory.paymentMethod.paymentCard.prepaidCard.IPrepaidCard
    ): Promise<factory.paymentMethod.paymentCard.prepaidCard.IPrepaidCard> {
        return this.fetch({
            uri: `/paymentMethods/${factory.paymentMethodType.PrepaidCard}`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * プリペイドカード検索
     */
    public async searchPrepaidCards(
        params: any
    ): Promise<ISearchResult<factory.paymentMethod.paymentCard.prepaidCard.IPrepaidCard[]>> {
        return this.fetch({
            uri: `/paymentMethods/${factory.paymentMethodType.PrepaidCard}`,
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
