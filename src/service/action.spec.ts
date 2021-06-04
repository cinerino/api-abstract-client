// tslint:disable:no-implicit-dependencies
/**
 * action service test
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('search()', () => {
    let sandbox: sinon.SinonSandbox;
    let actions: client.service.Action;

    before(() => {
        const auth = new StubAuthClient();
        actions = new client.service.Action({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('fetch結果が正常であればそのまま取得できるはず', async () => {
        const params = {};
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(actions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await actions.search(<any>params);
        assert.deepEqual(result, { data });
        sandbox.verify();
    });
});
