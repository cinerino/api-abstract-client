// tslint:disable:max-classes-per-file
/**
 * API Service Library for Javascript
 */
import * as factory from './factory';
import * as ServiceFactory from './service';

import { AuthClient, StubAuthClient } from './auth/authClient';

import { CreativeWorkService } from './service/creativeWork';
import { DeliveryService } from './service/delivery';
import { EventService } from './service/event';
import { InvoiceService } from './service/invoice';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { OwnershipInfoService } from './service/ownershipInfo';
import { PaymentService } from './service/payment';
import { PaymentMethodService } from './service/paymentMethod';
import { PersonService } from './service/person';
import { PersonOwnershipInfoService } from './service/person/ownershipInfo';
import { ReservationService } from './service/reservation';
import { SellerService } from './service/seller';
import { TaskService } from './service/task';
import { MoneyTransferTransactionService } from './service/transaction/moneyTransfer';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import { UserPoolService } from './service/userPool';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * 認証クライアント抽象クラス
 */
export abstract class Auth extends AuthClient { }

export namespace auth {
    /**
     * 抽象認証クライアント
     */
    // tslint:disable-next-line:no-shadowed-variable
    export abstract class Auth extends AuthClient { }
    /**
     * スタブ認証クライアント
     */
    export class StubAuth extends StubAuthClient { }
}

/**
 * サービスモジュール
 */
export namespace service {
    export type IOptions = ServiceFactory.IOptions;
    export type IFetchOptions = ServiceFactory.IFetchOptions;
    export type ISearchResult<T> = ServiceFactory.ISearchResult<T>;
    /**
     * Baseサービス
     */
    export class Service extends ServiceFactory.Service { }

    /**
     * 作品サービス
     */
    export class CreativeWork extends CreativeWorkService { }
    /**
     * 配送サービス
     */
    export class Delivery extends DeliveryService { }
    /**
     * イベントサービス
     */
    export class Event extends EventService { }
    /**
     * インボイスサービス
     */
    export class Invoice extends InvoiceService { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 組織サービス
     * @deprecated Use service.Seller. 販売者サービスを使用してください
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
     * 決済方法サービス
     */
    export class PaymentMethod extends PaymentMethodService { }
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
     * 販売者サービス
     */
    export class Seller extends SellerService { }
    /**
     * タスクサービス
     */
    export class Task extends TaskService { }
    /**
     * 取引サービス
     */
    export namespace transaction {
        /**
         * 通貨転送取引サービス
         */
        export class MoneyTransfer extends MoneyTransferTransactionService { }
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
     * @alias service.transaction
     */
    export import txn = transaction;
    /**
     * Cognitoユーザープールサービス
     */
    export class UserPool extends UserPoolService { }
}
