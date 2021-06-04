import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IAction = factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>;

export type IPrintTicketAction = factory.action.transfer.print.ticket.IAction;

/**
 * アクションサービス
 */
export class ActionService extends Service {
    /**
     * アクション検索
     */
    public async search(params: factory.action.ISearchConditions): Promise<ISearchResult<IAction[]>> {
        return this.fetch({
            uri: '/actions',
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
