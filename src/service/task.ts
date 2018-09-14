import { CREATED, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * タスクサービス
 */
export class TaskService extends Service {
    /**
     * タスク作成
     */
    public async create<T extends factory.taskName>(params: factory.task.IAttributes<T>): Promise<factory.task.ITask<T>> {
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
    public async findById<T extends factory.taskName>(params: {
        name: T;
        id: string;
    }): Promise<factory.task.ITask<T>> {
        return this.fetch({
            uri: `/tasks/${params.name}/${params.id}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
