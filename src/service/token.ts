import { OK } from 'http-status';

import { Service } from '../service';

/**
 * トークンレスポンスインターフェース
 */
export interface ITokenResponse {
    token: string;
}

/**
 * トークンサービス
 */
export class TokenService extends Service {
    /**
     * トークンを取得する
     */
    public async getToken(params: {
        code: string;
    }): Promise<ITokenResponse> {
        return this.fetch({
            uri: '/tokens',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
