import { OK } from 'http-status';

import * as factory from '../factory';

import { Service } from '../service';

export type IProduct = factory.product.IProduct | factory.service.paymentService.IService;

/**
 * プロダクトサービス
 */
export class ProductService extends Service {
    /**
     * 検索
     */
    public async search(params: factory.product.ISearchConditions): Promise<{
        data: IProduct[];
    }> {
        // public async search(params: {
        //     project?: { id?: { $eq?: string } };
        //     typeOf?: { $eq?: string };
        // }): Promise<{
        //     data: factory.service.IService[];
        // }> {
        return this.fetch({
            uri: '/products',
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
     * プロダクトオファー検索
     */
    public async searchOffers(params: {
        itemOffered: { id: string };
        seller?: { id: string };
        availableAtOrFrom?: { id: string };
    }): Promise<factory.event.screeningEvent.ITicketOffer[]> {
        return this.fetch({
            uri: `/products/${params.itemOffered.id}/offers`,
            method: 'GET',
            expectedStatusCodes: [OK],
            qs: params
        })
            .then(async (response) => response.json());
    }
}
