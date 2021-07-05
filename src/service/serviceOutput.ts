import { OK } from 'http-status';

// import * as factory from '../factory';

import { Service } from '../service';

/**
 * サービスアウトプットサービス
 */
export class ServiceOutputService extends Service {
    /**
     * 検索
     */
    public async search(params: any): Promise<{
        data: any[];
    }> {
        return this.fetch({
            uri: '/serviceOutputs',
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
     * 所有権コードを発行する
     */
    public async authorize(params: {
        object: {
            /**
             * 識別子
             * メンバーシップコードなど
             */
            identifier: string;
            accessCode?: string;
        };
    }): Promise<{
        code: string;
    }> {
        return this.fetch({
            uri: `/serviceOutputs/${String(params.object?.identifier)}/authorize`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
