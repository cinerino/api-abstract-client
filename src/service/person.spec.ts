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

    it('クレジットカード検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.searchCreditCards({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード追加の結果が期待通り', async () => {
        const personId = 'me';
        const creditCard = <any>{};
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.addCreditCard({
            personId: personId,
            creditCard: creditCard
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード削除の結果が期待通り', async () => {
        const personId = 'me';
        const cardSeq = 'xxx';
        sandbox.mock(people).expects('fetch').once().resolves();

        const result = await people.deleteCreditCard({
            personId: personId,
            cardSeq: cardSeq
        });
        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('上映イベント予約検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = [{}];
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.searchScreeningEventReservations({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座開設の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.openAccount({
            personId: personId,
            name: 'name',
            accountType: client.factory.accountType.Coin
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座解約の結果が期待通り', async () => {
        const personId = 'me';
        const data = undefined;
        sandbox.mock(people).expects('fetch').once().resolves();

        const result = await people.closeAccount({
            personId: personId,
            accountNumber: '12345',
            accountType: client.factory.accountType.Coin
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座照会の結果が期待通り', async () => {
        const personId = 'me';
        const data = [{}];
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.searchAccounts({
            personId: personId,
            accountType: client.factory.accountType.Coin
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座取引履歴検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = [{}];
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.searchAccountMoneyTransferActions({
            personId: personId,
            accountNumber: '12345',
            accountType: client.factory.accountType.Coin
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('会員プログラム登録の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.registerProgramMembership({
            personId: personId,
            programMembershipId: 'programMembershipId',
            offerIdentifier: 'offerIdentifier',
            sellerType: client.factory.organizationType.MovieTheater,
            sellerId: 'sellerId'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('会員プログラム登録解除の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.unRegisterProgramMembership({
            personId: personId,
            ownershipInfoIdentifier: 'ownershipInfoIdentifier'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
