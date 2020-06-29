import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * トークンレスポンスインターフェース
 */
export interface ITokenResponse {
    token: string;
}
export type IOwnershipInfo<T extends factory.ownershipInfo.IGoodType> =
    factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGood<T>>;

/**
 * 所有権サービス
 */
export class OwnershipInfoService extends Service {
    /**
     * 所有権検索
     */
    public async search<T extends factory.ownershipInfo.IGoodType>(
        params: factory.ownershipInfo.ISearchConditions
    ): Promise<ISearchResult<IOwnershipInfo<T>[]>> {

        return this.fetch({
            uri: '/ownershipInfos',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(<string>response.headers.get('X-Total-Count'))
                        : undefined,
                    data: await response.json()
                };
            });
    }

    /**
     * 所有権トークンを取得する
     * 所有権コードを、jsonwebtokenに変換します
     * 変換されたトークンを使用して、認証、決済等を実行することができます
     * jsonwebtokenはローカル環境で検証することも可能です
     * @see https://jwt.io/
     */
    public async getToken(params: {
        code: string;
    }): Promise<ITokenResponse> {
        return this.fetch({
            uri: '/ownershipInfos/tokens',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 所有権検証アクションを検索する
     * 所有権に対して発行されたトークンを認証しようとしたアクションを検索します
     */
    public async searchCheckTokenActions(params: {
        id: string;
    }): Promise<ISearchResult<factory.action.check.token.IAction[]>> {
        return this.fetch({
            uri: `/ownershipInfos/${params.id}/actions/checkToken`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(<string>response.headers.get('X-Total-Count'))
                        : undefined,
                    data: await response.json()
                };
            });
    }

    /**
     * 登録日と劇場で会員数をカウント(sskts専用)
     */
    public async countByRegisterDateAndTheater(
        /**
         * 検索条件
         * fromDateとtoDateの時間を注意して
         */
        params: {
            /**
             * この日から検索する
             */
            fromDate: Date;
            /**
             * この日まで検索する
             */
            toDate: Date;
            /**
             * 劇場のID
             */
            theaterIds: string[];
        }
    ): Promise<{ count: number }> {
        return this.fetch({
            uri: '/ownershipInfos/countByRegisterDateAndTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
