import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';

export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw | factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;
export type IAccountOwnershipInfo<T extends factory.accountType> =
    factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<T>>;
export type IScreeningEventReservationOwnershipInfo =
    factory.ownershipInfo.IOwnershipInfo<factory.chevre.reservation.event.IReservation<factory.chevre.event.screeningEvent.IEvent>>;
export type IOwnershipInfoWithDetail<T extends factory.ownershipInfo.IGoodType> =
    factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IGoodWithDetail<T>>;
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
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * クレジットカード情報(情報の渡し方にはいくつかパターンがあるので、型を参照すること)
         */
        creditCard: ICreditCard;
    }): Promise<factory.paymentMethod.paymentCard.creditCard.ICheckedCard> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/creditCards`,
            method: 'POST',
            body: params.creditCard,
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }
    /**
     * クレジットカード検索
     */
    public async searchCreditCards(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
    }): Promise<factory.paymentMethod.paymentCard.creditCard.ICheckedCard[]> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/creditCards`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * クレジットカード削除
     */
    public async deleteCreditCard(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * カード連番
         */
        cardSeq: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/creditCards/${params.cardSeq}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
    /**
     * 口座開設
     */
    public async openAccount<T extends factory.accountType>(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * 口座名義
         */
        name: string;
        /**
         * 口座タイプ
         */
        accountType: T;
    }): Promise<IAccountOwnershipInfo<T>> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/accounts/${params.accountType}`,
            method: 'POST',
            body: {
                name: params.name
            },
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }
    /**
     * 口座解約
     * 口座の状態を変更するだけで、ユーザーの所有する口座リストから削除はされません。
     * 解約された口座で取引を進行しようとすると400エラーとなります。
     */
    public async closeAccount<T extends factory.accountType>(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
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
            uri: `/people/${params.personId}/ownershipInfos/accounts/${params.accountType}/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
    /**
     * 口座検索
     */
    // public async searchAccounts<T extends factory.accountType>(
    //     params: factory.ownershipInfo.ISearchConditions<factory.ownershipInfo.AccountGoodType.Account> & {
    //         /**
    //          * person id(basically specify 'me' to retrieve contacts of login user)
    //          */
    //         personId: string;
    //     }): Promise<ISearchResult<IAccountOwnershipInfo<T>[]>> {
    //     return this.fetch({
    //         uri: `/people/${params.personId}/ownershipInfos/accounts`,
    //         method: 'GET',
    //         qs: params,
    //         expectedStatusCodes: [OK]
    //     }).then(async (response) => {
    //         return {
    //             totalCount: Number(<string>response.headers.get('X-Total-Count')),
    //             data: await response.json()
    //         };
    //     });
    // }
    /**
     * 口座取引履歴検索
     */
    public async searchAccountMoneyTransferActions<T extends factory.accountType>(
        params: factory.pecorino.action.transfer.moneyTransfer.ISearchConditions<T> & {
            /**
             * person id(basically specify 'me' to retrieve contacts of login user)
             */
            personId: string;
        }): Promise<ISearchResult<factory.pecorino.action.transfer.moneyTransfer.IAction<T>[]>> {
        return this.fetch({
            // tslint:disable-next-line:max-line-length
            uri: `/people/${params.personId}/ownershipInfos/accounts/actions/moneyTransfer`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }
    /**
     * 上映イベント予約検索
     */
    // public async searchScreeningEventReservations(
    //     params: factory.ownershipInfo.ISearchConditions<factory.chevre.reservationType.EventReservation> & {
    //         /**
    //          * person id(basically specify 'me' to retrieve contacts of login user)
    //          */
    //         personId: string;
    //     }
    // ): Promise<ISearchResult<IScreeningEventReservationOwnershipInfo[]>> {
    //     return this.fetch({
    //         uri: `/people/${params.personId}/ownershipInfos/reservations/eventReservation/screeningEvent`,
    //         method: 'GET',
    //         qs: params,
    //         expectedStatusCodes: [OK]
    //     }).then(async (response) => {
    //         return {
    //             totalCount: Number(<string>response.headers.get('X-Total-Count')),
    //             data: await response.json()
    //         };
    //     });
    // }
    /**
     * 所有権検索
     */
    public async search<T extends factory.ownershipInfo.IGoodType>(
        params: factory.ownershipInfo.ISearchConditions<T> & {
            /**
             * person id(basically specify 'me' to retrieve contacts of login user)
             */
            personId: string;
        }): Promise<ISearchResult<IOwnershipInfoWithDetail<T>[]>> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }
    /**
     * 所有権に対して認可コードを発行する
     */
    public async authorize(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        ownershipInfoId: string;
    }): Promise<ICodeResponse> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/${params.ownershipInfoId}/authorize`,
            method: 'POST',
            expectedStatusCodes: [OK],
            body: params
        }).then(async (response) => response.json());
    }
}
