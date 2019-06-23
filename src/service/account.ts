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
}