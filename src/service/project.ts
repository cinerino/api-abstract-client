import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export interface IGetHealthResult {
    version?: string;
    status?: number;
    message?: string;
}

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
                    totalCount: (typeof response.headers.get('X-Total-Count') === 'string')
                        ? Number(<string>response.headers.get('X-Total-Count'))
                        : undefined,
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

    /**
     * プロジェクト設定取得
     */
    public async getSettings(params: {
        id: string;
    }): Promise<factory.project.ISettings> {
        return this.fetch({
            uri: `/projects/${params.id}/settings`,
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * ヘルスチェック
     */
    public async getHealth(_: any): Promise<IGetHealthResult> {
        return this.fetch({
            uri: '/health',
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                const version = response.headers.get('X-API-Version');

                return {
                    version: (typeof version === 'string') ? version : undefined,
                    status: response.status,
                    message: await response.text()
                };
            });
    }

    /**
     * DB統計取得
     */
    public async getDBStats(_: any): Promise<any> {
        return this.fetch({
            uri: '/stats/dbStats',
            method: 'GET',
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }
}
