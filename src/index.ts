// tslint:disable:max-classes-per-file
/**
 * API Service Library for Javascript
 */
import * as factory from './factory';

import { AuthClient } from './auth/authClient';

import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { OwnershipInfoService } from './service/ownershipInfo';
import { PaymentService } from './service/payment';
import { PersonService } from './service/person';
import { PersonOwnershipInfoService } from './service/person/ownershipInfo';
import { ReservationService } from './service/reservation';
import { TaskService } from './service/task';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { PlaceOrder2TransactionService } from './service/transaction/placeOrder2';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import { UserPoolService } from './service/userPool';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * 認証クライアント抽象クラス
 */
export abstract class Auth extends AuthClient { }
/**
 * サービスモジュール
 */
export namespace service {
    /**
     * イベントサービス
     */
    export class Event extends EventService { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 組織サービス
     */
    export class Organization extends OrganizationService { }
    /**
     * 所有権サービス
     */
    export class OwnershipInfo extends OwnershipInfoService { }
    /**
     * 決済サービス
     */
    export class Payment extends PaymentService { }
    /**
     * ユーザーサービス
     */
    export class Person extends PersonService { }
    export namespace person {
        /**
         * ユーザー所有権サービス
         */
        // tslint:disable-next-line:no-shadowed-variable
        export class OwnershipInfo extends PersonOwnershipInfoService { }
    }
    /**
     * 予約サービス
     */
    export class Reservation extends ReservationService { }
    /**
     * タスクサービス
     */
    export class Task extends TaskService { }
    /**
     * 取引サービス
     */
    export namespace txn {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 注文返品取引サービス
         */
        export class ReturnOrder extends ReturnOrderTransactionService { }
    }
    /**
     * 取引サービス
     * @deprecated Use service.txn
     */
    export namespace transaction {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrder2TransactionService { }
    }
    /**
     * Cognitoユーザープールサービス
     */
    export class UserPool extends UserPoolService { }
}
