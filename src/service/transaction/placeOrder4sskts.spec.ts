// tslint:disable:no-implicit-dependencies
/**
 * placeOrder transaction service test
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../../index';

import { StubAuthClient } from '../../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('placeOrder transaction client.service', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: client.service.transaction.PlaceOrder4sskts;

    before(() => {
        const auth = new StubAuthClient();
        transactions = new client.service.transaction.PlaceOrder4sskts({
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
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(transactions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await transactions.start({
            expires: new Date(),
            seller: { typeOf: client.factory.organizationType.MovieTheater, id: 'sellerId' },
            object: {
                passport: { token: 'passportToken' }
            }
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席仮予約結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(transactions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await transactions.createSeatReservationAuthorization({
            object: {
                event: { id: 'eventId' },
                acceptedOffer: []
            },
            purpose: { typeOf: client.factory.transactionType.PlaceOrder, id: 'transactionId' }
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席予約取消結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(transactions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await transactions.cancelSeatReservationAuthorization({
            id: 'actionId',
            purpose: { typeOf: client.factory.transactionType.PlaceOrder, id: 'transactionId' }
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('座席予約変更結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(transactions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await transactions.changeSeatReservationOffers({
            id: 'actionId',
            object: {
                event: { id: 'eventId' },
                acceptedOffer: []
            },
            purpose: { typeOf: client.factory.transactionType.PlaceOrder, id: 'transactionId' }
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(transactions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await transactions.confirm({
            id: 'transactionId',
            sendEmailMessage: true
        });
        assert.deepEqual(result, data);
    });

    it('取引中止結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox()
            .mock('*', data);
        sandbox.mock(transactions)
            .expects('fetch')
            .once()
            .resolves(await myMock());

        const result = await transactions.cancel({
            id: 'transactionId'
        });
        assert.deepEqual(result, undefined);
    });
});
