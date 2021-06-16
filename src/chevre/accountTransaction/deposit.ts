import * as factory from '@chevre/factory';
import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';
import { AccountTransactionService } from '../accountTransaction';

/**
 * 入金取引サービス
 */
export class DepositTransactionService extends Service implements AccountTransactionService {
    public typeOf: factory.account.transactionType = factory.account.transactionType.Deposit;

    /**
     * 取引を開始する
     */
    public async start(
        params: factory.account.transaction.deposit.IStartParamsWithoutDetail
    ): Promise<factory.account.transaction.deposit.ITransaction> {
        return this.fetch({
            uri: `/accountTransactions/${this.typeOf}/start`,
            method: 'POST',
            body: {
                ...params,
                amount: params.object.amount,
                toAccountNumber: params.object.toLocation.accountNumber,
                notes: params.object.description
            },
            expectedStatusCodes: [OK]
        })
            .then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        id?: string;
        transactionNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/accountTransactions/${this.typeOf}/${params.transactionNumber}/confirm?transactionNumber=1`
                : `/accountTransactions/${this.typeOf}/${params.id}/confirm`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引中止
     */
    public async cancel(params: {
        id?: string;
        transactionNumber?: string;
    }): Promise<void> {
        await this.fetch({
            uri: (typeof params.transactionNumber === 'string')
                ? `/accountTransactions/${this.typeOf}/${params.transactionNumber}/cancel?transactionNumber=1`
                : `/accountTransactions/${this.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
