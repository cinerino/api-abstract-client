// tslint:disable:no-implicit-dependencies
/**
 * ユーザープールサービステスト
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('ユーザープールサービス', () => {
    let sandbox: sinon.SinonSandbox;
    let userPoolService: client.service.UserPool;

    before(() => {
        const auth = new StubAuthClient();
        userPoolService = new client.service.UserPool({
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

    it('IDで検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(userPoolService).expects('fetch').once().resolves(await myMock());

        const result = await userPoolService.findById({ userPoolId: 'xxx' });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クライアント検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(userPoolService).expects('fetch').once().resolves(await myMock());

        const result = await userPoolService.searchClients({ userPoolId: 'xxx' });
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });

    it('IDでクライアント検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(userPoolService).expects('fetch').once().resolves(await myMock());

        const result = await userPoolService.findClientById({ userPoolId: 'xxx', clientId: 'xxx' });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
