import { CREATED, NO_CONTENT } from 'http-status';

import * as factory from '../factory';

import { Service } from '../service';

/**
 * 口座サービス
 */
export class AccountService extends Service {
    /**
     * 管理者として口座を開設する
     */
    public async open<T extends factory.accountType>(params: {
        /**
         * 口座タイプ
         */
        accountType: T;
        /**
         * 口座名義
         */
        name: string;
    }): Promise<factory.pecorino.account.IAccount<T>> {
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
    public async close<T extends factory.accountType>(params: {
        /**
         * 口座タイプ
         */
        accountType: T;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/accounts/${params.accountType}/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
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
        /**
         * 入金先口座番号
         * @deprecated Use object.toLocation
         */
        toAccountNumber?: string;
        /**
         * 入金金額
         * @deprecated Use object.amount
         */
        amount?: number;
        /**
         * 入金説明
         * @deprecated Use object.description
         */
        notes?: string;
    }): Promise<void> {
        if (params.object === undefined || params.object === null) {
            params.object = {};
        }
        if (typeof params.amount === 'number') {
            params.object.amount = params.amount;
        }
        if (typeof params.notes === 'string') {
            params.object.description = params.notes;
        }
        if (typeof params.toAccountNumber === 'string') {
            if (params.object.toLocation === undefined || params.object.toLocation === null) {
                params.object.toLocation = {};
            }
            params.object.toLocation.accountNumber = params.toAccountNumber;
        }

        await this.fetch({
            uri: '/accounts/transactions/deposit',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
