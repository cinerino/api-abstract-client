import { CREATED, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IAction<T extends factory.actionType> = factory.action.IAction<factory.action.IAttributes<T, any, any>>;

export type IPrintTicketAction = factory.action.transfer.print.ticket.IAction;

/**
 * アクションサービス
 */
export class ActionService extends Service {
    /**
     * アクション検索
     */
    public async search<T extends factory.actionType>(
        params: factory.action.ISearchConditions<T>
    ): Promise<ISearchResult<IAction<T>[]>> {
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

    /**
     * チケット印刷(sskts専用)
     */
    public async printTicket(
        /**
         * チケットオブジェクト
         */
        params: factory.action.transfer.print.ticket.ITicket
    ): Promise<IPrintTicketAction> {
        return this.fetch({
            uri: '/actions/print/ticket',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * チケット印刷アクション検索
     */
    public async searchPrintTicket(
        /**
         * 検索条件(sskts専用)
         */
        params: factory.action.transfer.print.ticket.ISearchConditions
    ): Promise<IPrintTicketAction[]> {
        return this.fetch({
            uri: '/actions/print/ticket',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
