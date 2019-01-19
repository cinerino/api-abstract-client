import { CREATED, OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

export type TaskName = factory.taskName | string;

/**
 * タスクサービス
 */
export class TaskService extends Service {
    /**
     * タスク作成
     */
    public async create<T extends TaskName>(params: factory.task.IAttributes<T>): Promise<factory.task.ITask<T>> {
        return this.fetch({
            uri: `/tasks/${params.name}`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }
    /**
     * IDで検索
     */
    public async findById<T extends TaskName>(params: {
        name: T;
        id: string;
    }): Promise<factory.task.ITask<T>> {
        return this.fetch({
            uri: `/tasks/${params.name}/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
    /**
     * 検索する
     */
    public async search<T extends TaskName>(
        params: factory.task.ISearchConditions<T>
    ): Promise<ISearchResult<factory.task.ITask<T>[]>> {
        return this.fetch({
            uri: '/tasks',
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
}
