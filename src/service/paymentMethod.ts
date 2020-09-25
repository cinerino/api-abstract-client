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
        params: any
    ): Promise<ISearchResult<factory.chevre.paymentMethod.paymentCard.movieTicket.IMovieTicket[]>> {
        return this.fetch({
            uri: `/paymentMethods/${factory.chevre.service.paymentService.PaymentServiceType.MovieTicket}`,
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
