import { OK } from 'http-status';

// import * as factory from '../factory';
import { Service } from '../service';

export type TelemetryType = string;
export type IDataValue = any;
export interface IData {
    measureDate: Date;
    value: IDataValue;
}
/**
 * テレメトリーサービス
 */
export class TelemetryService extends Service {
    /**
     * データ検索
     */
    public async search<T extends TelemetryType>(params: {
        telemetryType: T;
        measureFrom: Date;
        measureThrough: Date;
    }): Promise<IData[]> {
        return this.fetch({
            uri: `/telemetry/${params.telemetryType}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
