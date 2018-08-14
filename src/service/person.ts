import * as factory from '@cinerino/factory';
import { ACCEPTED, CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw | factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;
export type IScreeningEventReservation = factory.chevre.reservation.event.IReservation<factory.chevre.event.screeningEvent.IEvent>;

/**
 * ユーザーサービス
 */
export class PersonService extends Service {
    /**
     * ユーザーの連絡先を検索する
     */
    public async getContacts(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
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
         * person id
         * basically specify 'me' to retrieve contacts of login user
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
     * @see example /example/person/handleCreditCards
     */
    public async findCreditCards(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
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
     * @return successfully created credit card info
     * @see example /example/person/handleCreditCards
     */
    public async addCreditCard(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
        /**
         * credit card info
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
     * @see /example/person/handleCreditCards
     */
    public async deleteCreditCard(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
        /**
         * cardSeq
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
    public async openAccount(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
        /**
         * 口座名義
         */
        name: string;
    }): Promise<factory.pecorino.account.IAccount<factory.accountType.Point>> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts`,
            method: 'POST',
            body: {
                name: params.name
            },
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 口座開解約
     * 口座の状態を変更するだけで、ユーザーの所有する口座リストから削除はされません。
     * 解約された口座で取引を進行しようとすると400エラーとなります。
     */
    public async closeAccount(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/${params.accountNumber}/close`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座照会
     */
    public async findAccounts(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
    }): Promise<factory.pecorino.account.IAccount<factory.accountType.Point>[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 口座取引履歴検索
     */
    public async searchAccountMoneyTransferActions(params: {
        /**
         * person id
         * ログインユーザーの場合'me'を指定
         */
        personId: string;
        /**
         * 口座番号
         */
        accountNumber: string;
    }): Promise<factory.pecorino.action.transfer.moneyTransfer.IAction<factory.accountType.Point>[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/${params.accountNumber}/actions/moneyTransfer`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 所有権を検索する
     * 座席予約、所属会員プログラム、などユーザーの資産(モノ、サービス)を検索します。
     */
    public async searchOwnershipInfos<T extends factory.ownershipInfo.IGoodType>(
        params: factory.ownershipInfo.ISearchConditions<T>
    ): Promise<factory.ownershipInfo.IOwnershipInfo<T>[]> {
        return this.fetch({
            uri: `/people/${params.ownedBy}/ownershipInfos/${params.goodType}`,
            method: 'GET',
            qs: {
                ownedAt: params.ownedAt
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 会員プログラムに登録する
     */
    public async registerProgramMembership(params: {
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
