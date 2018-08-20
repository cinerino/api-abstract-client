// import * as factory from '@cinerino/factory';
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
            uri: '/auth/token',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        });
    }
}
