import * as factory from '../factory';

/**
 * 取引抽象サービス
 */
export abstract class TransactionService {
    public typeOf: factory.transactionType;
}
