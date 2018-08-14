// tslint:disable:max-classes-per-file
/**
 * transporters
 */
import * as createDebug from 'debug';
import { NO_CONTENT } from 'http-status';
import * as fetch from 'isomorphic-fetch';

const debug = createDebug('cinerino-api-abstract-client:transporters');
// tslint:disable-next-line
// const pkg = require('../package.json');

/**
 * transporter abstract class
 * トランスポーター抽象クラス
 */
export abstract class Transporter {
    public abstract async fetch(url: string, options: RequestInit): Promise<any>;
}

export type IBodyResponseCallback = Promise<any>;

/**
 * RequestError
 */
export class RequestError extends Error {
    public code: number;
    public errors: Error[];
}

/**
 * stub transporter
 * スタブトランポーター
 */
export class StubTransporter implements Transporter {
    public body: any;
    constructor(body: any) {
        this.body = body;
    }

    public async fetch(url: string, options: RequestInit) {
        debug('fetching...', url, options);

        return this.body;
    }
}

/**
 * DefaultTransporter
 */
export class DefaultTransporter implements Transporter {
    /**
     * Default user agent.
     */
    // public static readonly USER_AGENT: string = `cinerino-api-javascript-client/${pkg.version}`;

    public expectedStatusCodes: number[];

    constructor(expectedStatusCodes: number[]) {
        this.expectedStatusCodes = expectedStatusCodes;
    }

    /**
     * Configures request options before making a request.
     */
    public static CONFIGURE(options: RequestInit): RequestInit {
        // set transporter user agent
        options.headers = (options.headers !== undefined) ? options.headers : {};
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        // if (!options.headers['User-Agent']) {
        //     options.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
        // } else if (options.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
        //     options.headers['User-Agent'] = `${options.headers['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
        // }

        return options;
    }

    /**
     * Makes a request with given options and invokes callback.
     */
    public async fetch(url: string, options: RequestInit) {
        const fetchOptions = DefaultTransporter.CONFIGURE(options);

        debug('fetching...', url, fetchOptions);

        return fetch(url, fetchOptions).then(async (response) => this.wrapCallback(response));
    }

    /**
     * Wraps the response callback.
     */
    private async wrapCallback(response: Response): Promise<any> {
        let err: RequestError = new RequestError('An unexpected error occurred');

        debug('request processed', response.status);
        if (this.expectedStatusCodes.indexOf(response.status) < 0) {
            // Consider all 4xx and 5xx responses errors.
            let body: any;
            try {
                // Only and only application/json responses should
                // be decoded back to JSON, but there are cases API back-ends
                // responds without proper content-type.
                body = await response.clone().json();
            } catch (error) {
                body = await response.clone().text();
            }

            if (typeof body === 'object' && body.error !== undefined) {
                err = new RequestError(body.error.message);
                err.code = response.status;
                err.errors = body.error.errors;
            } else {
                err = new RequestError(body);
                err.code = response.status;
                err.errors = [];
            }
        } else {
            if (response.status === NO_CONTENT) {
                // consider 204
                return;
            } else {
                // consider 200,201
                return response.json();
            }
        }

        throw err;
    }
}

/**
 * TransporterWithRequestPromise
 */
// export class TransporterWithRequestPromise {
//     /**
//      * Default user agent.
//      */
//     public static readonly USER_AGENT: string = `sskt-api-nodejs-client/${pkg.version}`;

//     public expectedStatusCodes: number[];

//     constructor(expectedStatusCodes: number[]) {
//         this.expectedStatusCodes = expectedStatusCodes;
//     }

//     /**
//      * Configures request options before making a request.
//      */
//     public static CONFIGURE(options: request.OptionsWithUri): request.OptionsWithUri {
//         // set transporter user agent
//         options.headers = (options.headers !== undefined) ? options.headers : {};
//         if (!options.headers['User-Agent']) {
//             options.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
//         } else if (options.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
//             options.headers['User-Agent'] = `${options.headers['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
//         }

//         return options;
//     }

//     /**
//      * Makes a request with given options and invokes callback.
//      */
//     public async request(options: request.OptionsWithUri) {
//         const requestOptions = DefaultTransporter.CONFIGURE(options);

//         return await request(requestOptions)
//             .then((res) => this.wrapCallback(res));
//     }

//     /**
//      * Wraps the response callback.
//      */
//     private wrapCallback(res: request.FullResponse): any {
//         let err: RequestError = new RequestError('An unexpected error occurred');

//         debug('request processed', res.statusCode, res.body);
//         if (res.statusCode !== undefined) {
//             if (this.expectedStatusCodes.indexOf(res.statusCode) < 0) {
//                 if (typeof res.body === 'string') {
//                     // Consider all 4xx and 5xx responses errors.
//                     err = new RequestError(res.body);
//                     err.code = res.statusCode;
//                 }

//                 if (typeof res.body === 'object' && res.body.errors !== undefined) {
//                     // consider 400
//                     err = new RequestError((<any[]>res.body.errors).map((error) => `${error.title}:${error.detail}`).join('\n'));
//                     err.code = res.statusCode;
//                     err.errors = res.body.errors;
//                 }
//             } else {
//                 if (res.body !== undefined) {
//                     // consider 200,201,404
//                     return res.body;
//                 } else {
//                     // consider 204
//                     return;
//                 }
//             }
//         }

//         throw err;
//     }
// }
