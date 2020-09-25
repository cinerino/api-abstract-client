import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';

import { ISearchResult, Service } from '../service';

/**
 * 口座サービス
 */
export class AccountService extends Service {
    /**
     * 管理者として口座を開設する
     */
    public async open(params: {
        /**
         * 口座タイプ
         */
        accountType: string;
        /**
         * 口座名義
         */
        name: string;
    }): Promise<factory.pecorino.account.IAccount> {
        return this.fetch({
            uri: '/accounts',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 管理者として口座を解約する
     */
    public async close(params: {
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/accounts/Default/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座を検索する
     */
    public async search(
        params: factory.pecorino.account.ISearchConditions
    ): Promise<ISearchResult<factory.pecorino.account.IAccount[]>> {
        return this.fetch({
            uri: '/accounts',
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
     * 口座上の転送アクションを検索する
     */
    public async searchMoneyTransferActions(
        params: factory.pecorino.action.transfer.moneyTransfer.ISearchConditions
    ): Promise<ISearchResult<factory.pecorino.action.transfer.moneyTransfer.IAction[]>> {
        return this.fetch({
            uri: `/accounts/actions/moneyTransfer`,
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
     * ポイントを入金する(sskts専用)
     */
    public async deposit4sskts(params: {
        object?: {
            /**
             * 金額
             */
            amount?: number;
            /**
             * 入金先
             */
            toLocation?: {
                accountNumber?: string;
            };
            /**
             * 取引説明
             */
            description?: string;
        };
        /**
         * 入金受取人情報
         */
        recipient: {
            id: string;
            name: string;
            url: string;
        };
    }): Promise<void> {
        if (params.object === undefined || params.object === null) {
            params.object = {};
        }
        if (typeof (<any>params).amount === 'number') {
            params.object.amount = (<any>params).amount;
        }
        if (typeof (<any>params).notes === 'string') {
            params.object.description = (<any>params).notes;
        }
        if (typeof (<any>params).toAccountNumber === 'string') {
            if (params.object.toLocation === undefined || params.object.toLocation === null) {
                params.object.toLocation = {};
            }
            params.object.toLocation.accountNumber = (<any>params).toAccountNumber;
        }

        await this.fetch({
            uri: '/accounts/transactions/deposit',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
