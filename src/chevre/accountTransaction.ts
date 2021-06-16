import * as factory from '@chevre/factory';

/**
 * 口座取引抽象サービス
 */
export abstract class AccountTransactionService {
    public typeOf: factory.account.transactionType;
}
