// tslint:disable:no-implicit-dependencies
/**
 * 口座サービステスト
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('口座サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let accountService: client.service.Account;

    before(() => {
        const auth = new StubAuthClient();
        accountService = new client.service.Account({
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

    it('入金結果が期待通り', async () => {
        const params = {};
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(accountService)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await accountService.deposit4sskts(<any>params);
        assert.deepEqual(result, undefined);
        sandbox.verify();
    });
});
