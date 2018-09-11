import { OK } from 'http-status';

import { Service } from '../service';

export interface ITokenResponse {
    token: string;
}
/**
 * 所有権サービス
 */
export class OwnershipInfoService extends Service {
    /**
     * 所有権トークンを取得する
     */
    public async getToken(params: {
        code: string;
    }): Promise<ITokenResponse> {
        return this.fetch({
            uri: '/ownershipInfos/tokens',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * 所有権検証アクションを検索する
     */
    public async searchCheckTokenActions(params: {
        id: string;
    }): Promise<ITokenResponse> {
        return this.fetch({
            uri: `/ownershipInfos/${params.id}/actions/checkToken`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
