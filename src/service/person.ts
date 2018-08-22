import * as factory from '@cinerino/factory';
import { ACCEPTED, CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw | factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;
export type IAccountOwnershipInfo<T extends factory.accountType> =
    factory.ownershipInfo.IOwnershipInfo<factory.pecorino.account.IAccount<T>>;
export type IScreeningEventReservationOwnershipInfo =
    factory.ownershipInfo.IOwnershipInfo<factory.chevre.reservation.event.IReservation<factory.chevre.event.screeningEvent.IEvent>>;
export interface ICodeResponse {
    code: string;
}

/**
 * ユーザーサービス
 */
export class PersonService extends Service {
    /**
     * ユーザーの連絡先を検索する
     */
    public async getContacts(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
    }): Promise<factory.person.IContact> {
        return this.fetch({
            uri: `/people/${params.personId}/contacts`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
    /**
     * ユーザーの連絡先を更新する
     */
    public async updateContacts(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * contacts
         */
        contacts: factory.person.IContact;
    }): Promise<void> {
        return this.fetch({
            uri: `/people/${params.personId}/contacts`,
            method: 'PUT',
            body: params.contacts,
            expectedStatusCodes: [NO_CONTENT]
        });
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
            uri: `/people/${params.personId}/creditCards`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
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
            uri: `/people/${params.personId}/creditCards`,
            method: 'POST',
            body: params.creditCard,
            expectedStatusCodes: [CREATED]
        });
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
        return this.fetch({
            uri: `/people/${params.personId}/creditCards/${params.cardSeq}`,
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
            uri: `/people/${params.personId}/accounts/${params.accountType}`,
            method: 'POST',
            body: {
                name: params.name
            },
            expectedStatusCodes: [CREATED]
        });
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
        return this.fetch({
            uri: `/people/${params.personId}/accounts/${params.accountType}/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
    /**
     * 口座検索
     */
    public async searchAccounts<T extends factory.accountType>(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * 口座タイプ
         */
        accountType: T;
    }): Promise<IAccountOwnershipInfo<T>[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/${params.accountType}`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 口座取引履歴検索
     */
    public async searchAccountMoneyTransferActions<T extends factory.accountType>(params: {
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
    }): Promise<factory.pecorino.action.transfer.moneyTransfer.IAction<T>[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/${params.accountType}/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 上映イベント予約検索
     */
    public async searchScreeningEventReservations(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
    }): Promise<IScreeningEventReservationOwnershipInfo[]> {
        return this.fetch({
            uri: `/people/${params.personId}/reservations/eventReservation/screeningEvent`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 所有権に対して認可コードを発行する
     */
    public async authorizeOwnershipInfo(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * 所有権識別子
         */
        identifier: string;
        /**
         * 所有対象物のタイプ
         */
        goodType: factory.ownershipInfo.IGoodType;
    }): Promise<ICodeResponse> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/${params.goodType}/${params.identifier}/authorize`,
            method: 'GET',
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 注文を検索する
     */
    public async searchOrders(params: factory.order.ISearchConditions & {
        personId: string;
    }): Promise<factory.order.IOrder[]> {
        return this.fetch({
            uri: `/people/${params.personId}/orders`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
    /**
     * 会員プログラムに登録する
     */
    public async registerProgramMembership(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * 会員プログラムID
         */
        programMembershipId: string;
        /**
         * 会員プログラムに対するオファー識別子
         */
        offerIdentifier: string;
        /**
         * 販売者タイプ
         */
        sellerType: factory.organizationType;
        /**
         * 販売者ID
         */
        sellerId: string;
    }): Promise<factory.task.registerProgramMembership.ITask> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/programMembership/register`,
            method: 'PUT',
            body: {
                programMembershipId: params.programMembershipId,
                offerIdentifier: params.offerIdentifier,
                sellerType: params.sellerType,
                sellerId: params.sellerId
            },
            expectedStatusCodes: [ACCEPTED]
        });
    }
    /**
     * 会員プログラム登録解除
     */
    public async unRegisterProgramMembership(params: {
        /**
         * person id(basically specify 'me' to retrieve contacts of login user)
         */
        personId: string;
        /**
         * 会員プログラム所有権識別子
         */
        ownershipInfoIdentifier: string;
    }): Promise<factory.task.unRegisterProgramMembership.ITask> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/programMembership/${params.ownershipInfoIdentifier}/unRegister`,
            method: 'PUT',
            body: {},
            expectedStatusCodes: [ACCEPTED]
        });
    }
}
