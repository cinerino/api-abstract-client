// tslint:disable:no-implicit-dependencies
/**
 * タスクサービステスト
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('タスクサービス', () => {
    let sandbox: sinon.SinonSandbox;
    let taskService: client.service.Task;

    before(() => {
        const auth = new StubAuthClient();
        taskService = new client.service.Task({
            auth: auth,
            endpoint: API_ENDPOINT
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
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(taskService).expects('fetch').once().resolves(await myMock());

        const result = await taskService.create(<any>{});

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('IDで検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(taskService).expects('fetch').once().resolves(await myMock());

        const result = await taskService.findById(<any>{});

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(taskService).expects('fetch').once().resolves(await myMock());

        const result = await taskService.search(<any>{});
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });
});
