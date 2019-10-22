import * as factory from '@cinerino/factory';
import { CREATED } from 'http-status';

import { Service } from '../../service';

/**
 * 確定結果インターフェース
 */
export interface IConfirmResult {
    id: string;
}

/**
 * 返品取引サービス
 */
export class ReturnOrderTransaction4tttsService extends Service {
    /**
     * 取引確定
     */
    public async confirm(params: {
        /**
         * 返品者
         */
        agent?: {
            identifier?: factory.person.IIdentifier;
        };
        /**
         * 開演日(YYYYMMDD)
         */
        performanceDay: string;
        /**
         * 購入番号
         */
        paymentNo: string;
        /**
         * 手数料
         */
        cancellationFee: number;
        /**
         * 返品理由
         */
        reason: factory.transaction.returnOrder.Reason;
        informOrderUrl?: string;
        informReservationUrl?: string;
    }): Promise<IConfirmResult> {
        return this.fetch({
            uri: `/ttts/transactions/${factory.transactionType.ReturnOrder}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                ...params,
                performance_day: params.performanceDay,
                payment_no: params.paymentNo,
                cancellation_fee: params.cancellationFee,
                reason: params.reason
            }
        })
            .then(async (response) => response.json());
    }

    /**
     * 確定した取引に関して、購入者にメール通知を送信する
     */
    public async sendEmailNotification(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes;
    }): Promise<factory.task.ITask<factory.taskName.SendEmailMessage>> {
        return this.fetch({
            uri: `/ttts/transactions/${factory.transactionType.ReturnOrder}/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        })
            .then(async (response) => response.json());
    }
}
