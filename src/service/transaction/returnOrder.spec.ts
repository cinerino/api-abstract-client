// tslint:disable:no-implicit-dependencies
/**
 * 注文返品取引サービステスト
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';

import * as client from '../../index';

import { StubAuthClient } from '../../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('注文返品取引サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: client.service.txn.ReturnOrder;

    before(() => {
        const auth = new StubAuthClient();
        transactions = new client.service.txn.ReturnOrder({
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

    it('取引開始結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.start({
            expires: new Date(),
            object: {
                order: { orderNumber: 'orderNumber' }
            }
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引確定結果が期待通り', async () => {
        const data = undefined;
        sandbox.mock(transactions).expects('fetch').once().resolves();

        const result = await transactions.confirm({
            id: 'id'
        });
        assert.deepEqual(result, data);
    });
});
