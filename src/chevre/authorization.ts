import { CREATED, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export interface ICreateParams {
    project: factory.project.IProject;
    typeOf: 'Authorization';
    code: string;
    object: any;
    validFrom: Date;
    expiresInSeconds: number;

}

/**
 * 承認サービス
 */
export class AuthorizationService extends Service {
    /**
     * 承認発行
     */
    public async create(params: ICreateParams[]): Promise<factory.authorization.IAuthorization[]> {

        return this.fetch({
            uri: '/authorizations',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 承認検索
     */
    public async search(
        params: factory.authorization.ISearchConditions
    ): Promise<ISearchResult<factory.authorization.IAuthorization[]>> {

        return this.fetch({
            uri: '/authorizations',
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
}
