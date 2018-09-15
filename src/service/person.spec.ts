// tslint:disable:no-implicit-dependencies
/**
 * person service test
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('person service', () => {
    let sandbox: sinon.SinonSandbox;
    let people: client.service.Person;

    before(() => {
        const auth = new StubAuthClient();
        people = new client.service.Person({
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

    it('プロフィール取得の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());
        const personId = 'me';

        const result = await people.getProfile({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('プロフィール更新の結果が期待通り', async () => {
        const personId = 'me';
        const data = undefined;
        sandbox.mock(people).expects('fetch').once().resolves();

        const profile = {
            givenName: 'xxx',
            familyName: 'xxx',
            telephone: 'xxx',
            email: 'xxx'
        };
        const result = await people.updateProfile({
            personId: personId,
            ...profile
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
