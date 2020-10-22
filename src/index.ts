// tslint:disable:max-classes-per-file
/**
 * API Service Library for Javascript
 */
import * as factory from './factory';
import * as ServiceFactory from './service';

import { AuthClient, StubAuthClient } from './auth/authClient';

import { AccountService } from './service/account';
import { ActionService } from './service/action';
import { AuthorizationService } from './service/authorization';
import { CategoryCodeService } from './service/categoryCode';
import { CreativeWorkService } from './service/creativeWork';
import { DeliveryService } from './service/delivery';
import { EventService } from './service/event';
import { IAMService } from './service/iam';
import { InvoiceService } from './service/invoice';
import { OfferService } from './service/offer';
import { OrderService } from './service/order';
import { OwnershipInfoService } from './service/ownershipInfo';
import { PaymentService } from './service/payment';
import { PaymentMethodService } from './service/paymentMethod';
import { PersonService } from './service/person';
import { PersonOwnershipInfoService } from './service/person/ownershipInfo';
import { PlaceService } from './service/place';
import { ProductService } from './service/product';
import { ProjectService } from './service/project';
import { ReservationService } from './service/reservation';
import { SellerService } from './service/seller';
import { ServiceOutputService } from './service/serviceOutput';
import { TaskService } from './service/task';
import { TokenService } from './service/token';
import { MoneyTransferTransactionService } from './service/transaction/moneyTransfer';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { PlaceOrderTransaction4ssktsService } from './service/transaction/placeOrder4sskts';
import { PlaceOrderTransaction4tttsService } from './service/transaction/placeOrder4ttts';
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
     * 口座サービス
     */
    export class Account extends AccountService { }

    /**
     * アクションサービス
     */
    export class Action extends ActionService { }

    /**
     * 認可サービス
     */
    export class Authorization extends AuthorizationService { }

    /**
     * カテゴリーコードサービス
     */
    export class CategoryCode extends CategoryCodeService { }

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
     * IAMサービス
     */
    export class IAM extends IAMService { }

    /**
     * インボイスサービス
     */
    export class Invoice extends InvoiceService { }

    /**
     * オファーサービス
     */
    export class Offer extends OfferService { }

    /**
     * 注文サービス
     */
    export class Order extends OrderService { }

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
     * 場所サービス
     */
    export class Place extends PlaceService { }

    /**
     * プロダクトサービス
     */
    export class Product extends ProductService { }

    /**
     * プロジェクトサービス
     */
    export class Project extends ProjectService { }

    /**
     * 予約サービス
     */
    export class Reservation extends ReservationService { }

    /**
     * 販売者サービス
     */
    export class Seller extends SellerService { }

    /**
     * サービスアウトプットサービス
     */
    export class ServiceOutput extends ServiceOutputService { }

    /**
     * タスクサービス
     */
    export class Task extends TaskService { }

    /**
     * トークンサービス
     */
    export class Token extends TokenService { }

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
         * sskts専用注文取引サービス
         */
        export class PlaceOrder4sskts extends PlaceOrderTransaction4ssktsService { }

        /**
         * ttts専用注文取引サービス
         */
        export class PlaceOrder4ttts extends PlaceOrderTransaction4tttsService { }

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
