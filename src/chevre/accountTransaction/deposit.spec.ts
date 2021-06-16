// tslint:disable:no-implicit-dependencies
/**
 * 入金取引サービステスト
 */
import { } from 'mocha';
// import * as assert from 'power-assert';
import * as sinon from 'sinon';
// import * as pecorinoapi from '../../index';

// import { StubAuthClient } from '../../auth/authClient';

// const API_ENDPOINT = 'https://localhost';

describe('入金取引サービス', () => {
    let sandbox: sinon.SinonSandbox;
    // let transactions: pecorinoapi.service.transaction.Deposit;

    before(() => {
        // const auth = new StubAuthClient();
        // transactions = new pecorinoapi.service.transaction.Deposit({
        //     auth: auth,
        //     endpoint: API_ENDPOINT
        // });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
});
