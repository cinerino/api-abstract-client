import { OK } from 'http-status';

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
            uri: '/paymentMethods/movieTicket',
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
