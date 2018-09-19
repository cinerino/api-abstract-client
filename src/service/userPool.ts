import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * Cognitoユーザープールサービス
 */
export class UserPoolService extends Service {
    /**
     * IDで検索する
     */
    public async findById(params: {
        userPoolId: string;
    }): Promise<factory.cognito.UserPoolType> {
        return this.fetch({
            uri: `/userPools/${params.userPoolId}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * クライアント検索
     */
    public async searchClients(params: {
        userPoolId: string;
    }): Promise<ISearchResult<factory.cognito.UserPoolClientListType>> {
        return this.fetch({
            uri: `/userPools/${params.userPoolId}/clients`,
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
     * IDでクライアント検索
     */
    public async findClientById(params: {
        userPoolId: string;
        clientId: string;
    }): Promise<factory.cognito.UserPoolClientType> {
        return this.fetch({
            uri: `/userPools/${params.userPoolId}/clients/${params.clientId}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
