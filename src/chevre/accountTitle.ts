import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * 勘定科目サービス
 */
export class AccountTitleService extends Service {
    /**
     * 科目分類作成
     */
    public async createAccounTitleCategory(
        params: factory.accountTitle.IAccountTitle
    ): Promise<factory.accountTitle.IAccountTitle> {
        return this.fetch({
            uri: '/accountTitles/accountTitleCategory',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 科目分類検索
     */
    public async searchAccountTitleCategories(params: factory.accountTitle.ISearchConditions): Promise<{
        data: factory.accountTitle.IAccountTitle[];
    }> {
        return this.fetch({
            uri: '/accountTitles/accountTitleCategory',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    data: await response.json()
                };
            });
    }

    /**
     * 科目分類更新
     */
    public async updateAccounTitleCategory(params: factory.accountTitle.IAccountTitle): Promise<void> {
        await this.fetch({
            uri: `/accountTitles/accountTitleCategory/${encodeURIComponent(String(params.codeValue))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 科目分類削除
     * 不可逆的な物理削除です
     */
    public async deleteAccounTitleCategory(params: {
        project: { id: string };
        codeValue: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/accountTitles/accountTitleCategory/${encodeURIComponent(String(params.codeValue))}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 科目追加
     */
    public async createAccounTitleSet(
        params: factory.accountTitle.IAccountTitle
    ): Promise<factory.accountTitle.IAccountTitle> {
        if (params.inCodeSet === undefined) {
            throw new factory.errors.ArgumentNull('inCodeSet');
        }

        return this.fetch({
            uri: '/accountTitles/accountTitleSet',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 科目検索
     */
    public async searchAccountTitleSets(params: factory.accountTitle.ISearchConditions): Promise<{
        data: factory.accountTitle.IAccountTitle[];
    }> {
        return this.fetch({
            uri: '/accountTitles/accountTitleSet',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    data: await response.json()
                };
            });
    }

    /**
     * 科目更新
     */
    public async updateAccounTitleSet(params: factory.accountTitle.IAccountTitle): Promise<void> {
        await this.fetch({
            uri: `/accountTitles/accountTitleSet/${encodeURIComponent(String(params.codeValue))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 科目削除
     * 不可逆的な物理削除です
     */
    public async deleteAccounTitleSet(params: {
        project: { id: string };
        codeValue: string;
        inCodeSet: { codeValue: string };
    }): Promise<void> {
        await this.fetch({
            uri: `/accountTitles/accountTitleSet/${encodeURIComponent(String(params.codeValue))}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 細目追加
     */
    public async create(
        params: factory.accountTitle.IAccountTitle
    ): Promise<factory.accountTitle.IAccountTitle> {
        return this.fetch({
            uri: '/accountTitles',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        })
            .then(async (response) => response.json());
    }

    /**
     * 細目更新
     */
    public async update(
        params: factory.accountTitle.IAccountTitle
    ): Promise<void> {
        await this.fetch({
            uri: `/accountTitles/${encodeURIComponent(String(params.codeValue))}`,
            method: 'PUT',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 細目検索
     */
    public async search(params: factory.accountTitle.ISearchConditions): Promise<{
        data: factory.accountTitle.IAccountTitle[];
    }> {
        return this.fetch({
            uri: '/accountTitles',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        })
            .then(async (response) => {
                return {
                    data: await response.json()
                };
            });
    }

    /**
     * 細目削除
     * 不可逆的な物理削除です
     */
    public async deleteByCodeValue(params: {
        project: { id: string };
        codeValue: string;
        inCodeSet: {
            codeValue: string;
            inCodeSet: {
                codeValue: string;
            };
        };
    }): Promise<void> {
        await this.fetch({
            uri: `/accountTitles/${encodeURIComponent(String(params.codeValue))}`,
            method: 'DELETE',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
