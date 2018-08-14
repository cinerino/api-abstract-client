import { DefaultTransporter } from '../transporters';

/**
 * 抽象認証クライアント
 */
export abstract class AuthClient {
    public abstract async fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any>;
    public abstract async getAccessToken(): Promise<string>;
}

/**
 * テスト認証クライアント
 */
// tslint:disable-next-line:no-single-line-block-comment
/* istanbul ignore next */
export class StubAuthClient implements AuthClient {
    // tslint:disable-next-line:prefer-function-over-method
    public async fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any> {
        return (new DefaultTransporter(expectedStatusCodes)).fetch(url, options);
    }
    // tslint:disable-next-line:prefer-function-over-method
    public async getAccessToken(): Promise<string> {
        return 'access_token';
    }
}
