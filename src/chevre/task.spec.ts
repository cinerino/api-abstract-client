// tslint:disable:no-implicit-dependencies
/**
 * タスクサービステスト
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';

import { StubAuthClient } from '../auth/authClient';

import { TaskService } from './task';

const API_ENDPOINT = 'https://localhost';

describe('タスクサービス', () => {
    let sandbox: sinon.SinonSandbox;
    let taskService: TaskService;

    before(() => {
        const auth = new StubAuthClient();
        taskService = new TaskService({
            auth: auth,
            endpoint: API_ENDPOINT,
            project: { id: '' }
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('タスク作成の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(taskService)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await taskService.create(<any>{});

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('IDで検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(taskService)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await taskService.findById(<any>{});

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(taskService)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await taskService.search(<any>{});
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });
});
