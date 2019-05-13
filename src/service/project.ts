import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * プロジェクトサービス
 */
export class ProjectService extends Service {
    /**
     * プロジェクト検索
     */
    public async search(
        params: factory.project.ISearchConditions
    ): Promise<ISearchResult<factory.project.IProject[]>> {
        return this.fetch({
            uri: '/projects',
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
     * プロジェクト取得
     */
    public async findById(params: {
        id: string;
    }): Promise<factory.project.IProject> {
        return this.fetch({
            uri: `/projects/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
