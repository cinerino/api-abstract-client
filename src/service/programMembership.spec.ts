// tslint:disable:no-implicit-dependencies
/**
 * 会員プログラムサービステスト
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';

import { StubAuthClient } from '../auth/authClient';

import { ProgramMembershipService } from './programMembership';

const API_ENDPOINT = 'https://localhost';

describe('会員プログラムサービス', () => {
    let sandbox: sinon.SinonSandbox;
    let programMembershipService: ProgramMembershipService;

    before(() => {
        const auth = new StubAuthClient();
        programMembershipService = new ProgramMembershipService({
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

    it('会員プログラム検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(programMembershipService)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await programMembershipService.search({});
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });
});
