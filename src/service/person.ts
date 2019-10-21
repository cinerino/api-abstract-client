import { ACCEPTED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type IPerson = factory.person.IProfile & factory.person.IPerson;

/**
 * ユーザーサービス
 */
export class PersonService extends Service {
    /**
     * プロフィール検索
     */
    public async getProfile(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<factory.person.IProfile> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/profile`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロフィール更新
     */
    public async updateProfile(params: factory.person.IProfile & {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<void> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        await this.fetch({
            uri: `/people/${id}/profile`,
            method: 'PATCH',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 注文を検索する
     */
    public async searchOrders(params: factory.order.ISearchConditions & {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<ISearchResult<factory.order.IOrder[]>> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/orders`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * 会員検索
     */
    public async search(params: {
        id?: string;
        username?: string;
        email?: string;
        telephone?: string;
        givenName?: string;
        familyName?: string;
    }): Promise<ISearchResult<IPerson[]>> {
        return this.fetch({
            uri: '/people',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    totalCount: Number(<string>response.headers.get('X-Total-Count')),
                    data: await response.json()
                };
            });
    }

    /**
     * ユーザー取得
     */
    public async findById(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
    }): Promise<IPerson> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * ユーザー削除
     */
    public async deletById(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * 管理者による削除の場合、物理削除かどうかを指定できます
         */
        physically?: boolean;
    }): Promise<void> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        await this.fetch({
            uri: `/people/${id}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 会員プログラムに登録する(sskts専用)
     */
    public async registerProgramMembership(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
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
    }): Promise<factory.task.ITask<factory.taskName.RegisterProgramMembership>> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/programMembership/register`,
            method: 'PUT',
            body: {
                programMembershipId: params.programMembershipId,
                offerIdentifier: params.offerIdentifier,
                sellerType: params.sellerType,
                sellerId: params.sellerId
            },
            expectedStatusCodes: [ACCEPTED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 会員プログラム登録解除(sskts専用)
     */
    public async unRegisterProgramMembership(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * 会員プログラム所有権識別子
         */
        ownershipInfoIdentifier: string;
    }): Promise<factory.task.ITask<factory.taskName.UnRegisterProgramMembership>> {
        const id = (typeof params.id === 'string') ? params.id : 'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/programMembership/${params.ownershipInfoIdentifier}/unRegister`,
            method: 'PUT',
            body: {},
            expectedStatusCodes: [ACCEPTED]
        })
            .then(async (response) => response.json());
    }
}
