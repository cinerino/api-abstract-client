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

    it('連絡先取得の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());
        const personId = 'me';

        const result = await people.getContacts({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('連絡先更新の結果が期待通り', async () => {
        const personId = 'me';
        const data = undefined;
        sandbox.mock(people).expects('fetch').once().resolves();

        const contacts = {
            givenName: 'xxx',
            familyName: 'xxx',
            telephone: 'xxx',
            email: 'xxx'
        };
        const result = await people.updateContacts({
            personId: personId,
            contacts: contacts
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
