import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';

export type ICreditCard =
    factory.chevre.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw
    | factory.chevre.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;
export type IOwnershipInfoWithDetail = factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGoodWithDetail>;
export interface ICodeResponse {
    code: string;
}

/**
 * ユーザー所有権サービス
 */
export class PersonOwnershipInfoService extends Service {
    /**
     * クレジットカード追加
     */
    public async addCreditCard(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * クレジットカード情報
         * 情報の渡し方にはいくつかパターンがあるので、型を参照すること
         */
        creditCard: ICreditCard;
    }): Promise<factory.chevre.paymentMethod.paymentCard.creditCard.ICheckedCard> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/creditCards`,
            method: 'POST',
            body: params.creditCard,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * クレジットカード検索
     */
    public async searchCreditCards(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<factory.chevre.paymentMethod.paymentCard.creditCard.ICheckedCard[]> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/creditCards`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * クレジットカード削除
     */
    public async deleteCreditCard(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * カード連番
         */
        cardSeq: string;
    }): Promise<void> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        await this.fetch({
            uri: `/people/${id}/ownershipInfos/creditCards/${params.cardSeq}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座開設
     */
    public async openAccount(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * 口座名義
         */
        name: string;
        /**
         * 口座タイプ
         */
        accountType: string;
    }): Promise<factory.transaction.placeOrder.IResult> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/accounts/${params.accountType}`,
            method: 'POST',
            body: {
                name: params.name
            },
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 口座解約
     * 口座の状態を変更するだけで、ユーザーの所有する口座リストから削除はされません。
     * 解約された口座で取引を進行しようとすると400エラーとなります。
     */
    public async closeAccount(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        await this.fetch({
            uri: `/people/${id}/ownershipInfos/accounts/Default/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座取引履歴検索
     */
    public async searchAccountMoneyTransferActions(
        params: factory.pecorino.action.transfer.moneyTransfer.ISearchConditions & {
            /**
             * 未指定の場合`me`がセットされます
             */
            id?: string;
        }): Promise<ISearchResult<factory.pecorino.action.transfer.moneyTransfer.IAction[]>> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/accounts/actions/moneyTransfer`,
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
     * 所有権検索
     */
    public async search(
        params: factory.ownershipInfo.ISearchConditions & {
            /**
             * 未指定の場合`me`がセットされます
             */
            id?: string;
        }): Promise<ISearchResult<IOwnershipInfoWithDetail[]>> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos`,
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
     * 所有権に対して認可コードを発行する
     */
    public async authorize(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        ownershipInfoId: string;
    }): Promise<ICodeResponse> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/${params.ownershipInfoId}/authorize`,
            method: 'POST',
            expectedStatusCodes: [OK],
            body: params
        })
            .then(async (response) => response.json());
    }
}
