// tslint:disable:no-implicit-dependencies
/**
 * order service test
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';

import { StubAuthClient } from '../auth/authClient';

import { OrderService } from './order';

const API_ENDPOINT = 'https://localhost';

describe('注文サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let orders: OrderService;
    before(() => {
        const auth = new StubAuthClient();
        orders = new OrderService({
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
    it('注文照会結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(orders)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await orders.findByConfirmationNumber({
            confirmationNumber: '123',
            customer: {
                telephone: 'xxx'
            }
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
    it('注文検索結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(orders)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await orders.search({
            orderDateFrom: new Date(),
            orderDateThrough: new Date()
        });
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });
});
