import { NO_CONTENT } from 'http-status';

import { Service } from '../service';

/**
 * 口座サービス
 */
export class AccountService extends Service {
    /**
     * 注文トークンを使用して口座開設
     */
    public async openByToken(params: {
        instrument: {
            /**
             * 注文トークン
             */
            token?: string;
        };
        object: {
            /**
             * 口座種別
             */
            typeOf?: string;
            /**
             * 初期金額
             */
            initialBalance?: number;
        };
    }): Promise<void> {
        await this.fetch({
            uri: '/accounts/openByToken',
            method: 'POST',
            body: params,
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
    }): Promise<void> {
        await this.fetch({
            uri: '/accounts/transactions/deposit',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
