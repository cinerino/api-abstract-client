// tslint:disable:max-classes-per-file
/**
 * API Service Library for Javascript
 */
import * as factory from './factory';

import { AccountService } from './chevre/account';
import { AccountActionService } from './chevre/accountAction';
import { AccountingReportService } from './chevre/accountingReport';
import { AccountTitleService } from './chevre/accountTitle';
import { DepositTransactionService } from './chevre/accountTransaction/deposit';
import { TransferTransactionService } from './chevre/accountTransaction/transfer';
import { WithdrawTransactionService } from './chevre/accountTransaction/withdraw';
import { ActionService } from './chevre/action';
import { AssetTransactionService } from './chevre/assetTransaction';
import { CancelReservationAssetTransactionService } from './chevre/assetTransaction/cancelReservation';
import { MoneyTransferAssetTransactionService } from './chevre/assetTransaction/moneyTransfer';
import { PayAssetTransactionService } from './chevre/assetTransaction/pay';
import { RefundAssetTransactionService } from './chevre/assetTransaction/refund';
import { RegisterServiceAssetTransactionService } from './chevre/assetTransaction/registerService';
import { ReserveAssetTransactionService } from './chevre/assetTransaction/reserve';
import { AuthorizationService } from './chevre/authorization';
import { CategoryCodeService } from './chevre/categoryCode';
import { CreativeWorkService } from './chevre/creativeWork';
import { CustomerService } from './chevre/customer';
import { EventService } from './chevre/event';
import { IAMService } from './chevre/iam';
import { MeService } from './chevre/me';
import { OfferService } from './chevre/offer';
import { OfferCatalogService } from './chevre/offerCatalog';
import { OrderService } from './chevre/order';
import { OwnershipInfoService } from './chevre/ownershipInfo';
import { PlaceService } from './chevre/place';
import { PriceSpecificationService } from './chevre/priceSpecification';
import { ProductService } from './chevre/product';
import { ProjectService } from './chevre/project';
import { ReservationService } from './chevre/reservation';
import { SalesReportService } from './chevre/salesReport';
import { SellerService } from './chevre/seller';
import { ServiceOutputService } from './chevre/serviceOutput';
import { TaskService } from './chevre/task';
import { TransactionNumberService } from './chevre/transactionNumber';
import { UserPoolService } from './chevre/userPool';

export import factory = factory;

export namespace service {
    /**
     * 口座サービス
     */
    export class Account extends AccountService { }
    /**
     * 口座アクションサービス
     */
    export class AccountAction extends AccountActionService { }
    /**
     * 経理レポートサービス
     */
    export class AccountingReport extends AccountingReportService { }
    /**
     * 勘定科目サービス
     */
    export class AccountTitle extends AccountTitleService { }
    /**
     * アクションサービス
     */
    export class Action extends ActionService { }
    /**
     * 承認サービス
     */
    export class Authorization extends AuthorizationService { }
    /**
     * カテゴリーコード`サービス
     */
    export class CategoryCode extends CategoryCodeService { }
    /**
     * コンテンツサービス
     */
    export class CreativeWork extends CreativeWorkService { }
    /**
     * 顧客サービス
     */
    export class Customer extends CustomerService { }
    /**
     * イベントサービス
     */
    export class Event extends EventService { }
    /**
     * IAMサービス
     */
    export class IAM extends IAMService { }
    /**
     * 管理者サービス
     */
    export class Me extends MeService { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 所有権サービス
     */
    export class OwnershipInfo extends OwnershipInfoService { }
    /**
     * 場所サービス
     */
    export class Place extends PlaceService { }
    /**
     * 価格仕様サービス
     */
    export class PriceSpecification extends PriceSpecificationService { }
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
     * オファーサービス
     */
    export class Offer extends OfferService { }

    /**
     * オファーカタログサービス
     */
    export class OfferCatalog extends OfferCatalogService { }
    /**
     * 売上レポートサービス
     */
    export class SalesReport extends SalesReportService { }
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

    export namespace accountTransaction {
        /**
         * 入金取引サービス
         */
        export class Deposit extends DepositTransactionService { }
        /**
         * 出金取引サービス
         */
        export class Withdraw extends WithdrawTransactionService { }
        /**
         * 転送取引サービス
         */
        export class Transfer extends TransferTransactionService { }
    }

    /**
     * 取引サービス
     */
    export class AssetTransaction extends AssetTransactionService { }

    export namespace assetTransaction {
        /**
         * 予約キャンセル取引サービス
         */
        export class CancelReservation extends CancelReservationAssetTransactionService { }
        /**
         * 通貨転送取引サービス
         */
        export class MoneyTransfer extends MoneyTransferAssetTransactionService { }
        /**
         * 決済取引サービス
         */
        export class Pay extends PayAssetTransactionService { }
        /**
         * 返金取引サービス
         */
        export class Refund extends RefundAssetTransactionService { }
        /**
         * サービス登録取引
         */
        export class RegisterService extends RegisterServiceAssetTransactionService { }
        /**
         * 予約取引サービス
         */
        export class Reserve extends ReserveAssetTransactionService { }
    }

    /**
     * 取引番号サービス
     */
    export class TransactionNumber extends TransactionNumberService { }

    /**
     * Cognitoユーザープールサービス
     */
    export class UserPool extends UserPoolService { }
}
