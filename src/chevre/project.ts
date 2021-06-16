import { CREATED, NO_CONTENT, OK } from 'http-status';

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
     * プロジェクト作成
     */
    public async create(params: factory.project.IProject): Promise<factory.project.IProject> {
        return this.fetch({
            uri: '/projects',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロジェクト検索
     */
    public async search(params: factory.project.ISearchConditions & {
        $projection?: any;
    }): Promise<ISearchResult<factory.project.IProject[]>> {
        return this.fetch({
            uri: '/projects',
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
     * プロジェクト取得
     */
    public async findById(params: {
        id: string;
        $projection?: any;
    }): Promise<factory.project.IProject> {
        return this.fetch({
            uri: `/projects/${params.id}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * プロジェクト更新
     */
    public async update(params: factory.project.IProject): Promise<void> {
        await this.fetch({
            uri: `/projects/${params.id}`,
            method: 'PATCH',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
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
