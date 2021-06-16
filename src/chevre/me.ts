import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * 管理者サービス
 */
export class MeService extends Service {
    /**
     * マイプロジェクト検索
     */
    public async searchProjects(params: factory.project.ISearchConditions): Promise<ISearchResult<factory.project.IProject[]>> {
        return this.fetch({
            uri: '/members/me/projects',
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
