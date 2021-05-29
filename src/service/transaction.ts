import * as factory from '../factory';

export interface ISetProfileParams {
    /**
     * 取引ID
     */
    id: string;
    /**
     * プロフィール
     */
    agent: factory.person.IProfile & {
        /**
         * CLDR two-letter region code
         */
        telephoneRegion?: string;
    };
}

/**
 * 取引抽象サービス
 */
export abstract class TransactionService {
    public typeOf: factory.transactionType;

    /**
     * 取引人プロフィール変更
     */
    public abstract setProfile(params: ISetProfileParams): Promise<void>;
}
