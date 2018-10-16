import { CREATED } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * 決済サービス
 */
export class PaymentService extends Service {
    /**
     * ムビチケ購入番号確認
     */
    public async checkMovieTicket(
        params: factory.action.check.paymentMethod.movieTicket.IObject
    ): Promise<factory.action.check.paymentMethod.movieTicket.IAction> {
        return this.fetch({
            uri: `/payment/movieTicket/actions/check`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
        }).then(async (response) => response.json());
    }
}
