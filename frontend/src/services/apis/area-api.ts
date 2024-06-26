/* tslint:disable */
/* eslint-disable */
/**
 * Book Store API
 * Book Store API for renting books and notifying available/returned books in a store
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { AreaIn } from '../models';
// @ts-ignore
import { AreaOut } from '../models';
// @ts-ignore
import { AreaPatch } from '../models';
// @ts-ignore
import { DeleteStatus } from '../models';
/**
 * AreaApi - axios parameter creator
 * @export
 */
export const AreaApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Area
         * @summary Patch Area
         * @param {string} areaId 
         * @param {AreaPatch} areaPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        areaPatchArea: async (areaId: string, areaPatch: AreaPatch, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'areaId' is not null or undefined
            assertParamExists('areaPatchArea', 'areaId', areaId)
            // verify required parameter 'areaPatch' is not null or undefined
            assertParamExists('areaPatchArea', 'areaPatch', areaPatch)
            const localVarPath = `/api/area/{area_id}`
                .replace(`{${"area_id"}}`, encodeURIComponent(String(areaId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(areaPatch, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Area
         * @summary Create Area
         * @param {AreaIn} areaIn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaCreateArea: async (areaIn: AreaIn, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'areaIn' is not null or undefined
            assertParamExists('trackerApiViewAreaCreateArea', 'areaIn', areaIn)
            const localVarPath = `/api/area/area`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(areaIn, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Area
         * @summary Delete Area
         * @param {string} areaId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaDeleteArea: async (areaId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'areaId' is not null or undefined
            assertParamExists('trackerApiViewAreaDeleteArea', 'areaId', areaId)
            const localVarPath = `/api/area/{area_id}`
                .replace(`{${"area_id"}}`, encodeURIComponent(String(areaId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Area
         * @summary Get Area
         * @param {string} areaId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaGetArea: async (areaId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'areaId' is not null or undefined
            assertParamExists('trackerApiViewAreaGetArea', 'areaId', areaId)
            const localVarPath = `/api/area/{area_id}`
                .replace(`{${"area_id"}}`, encodeURIComponent(String(areaId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Arean
         * @summary List Areas
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaListAreas: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/area/area`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AreaApi - functional programming interface
 * @export
 */
export const AreaApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AreaApiAxiosParamCreator(configuration)
    return {
        /**
         * Area
         * @summary Patch Area
         * @param {string} areaId 
         * @param {AreaPatch} areaPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async areaPatchArea(areaId: string, areaPatch: AreaPatch, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AreaOut>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.areaPatchArea(areaId, areaPatch, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AreaApi.areaPatchArea']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Area
         * @summary Create Area
         * @param {AreaIn} areaIn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewAreaCreateArea(areaIn: AreaIn, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AreaOut>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewAreaCreateArea(areaIn, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AreaApi.trackerApiViewAreaCreateArea']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Area
         * @summary Delete Area
         * @param {string} areaId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewAreaDeleteArea(areaId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeleteStatus>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewAreaDeleteArea(areaId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AreaApi.trackerApiViewAreaDeleteArea']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Area
         * @summary Get Area
         * @param {string} areaId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewAreaGetArea(areaId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AreaOut>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewAreaGetArea(areaId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AreaApi.trackerApiViewAreaGetArea']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Arean
         * @summary List Areas
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewAreaListAreas(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AreaOut>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewAreaListAreas(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['AreaApi.trackerApiViewAreaListAreas']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * AreaApi - factory interface
 * @export
 */
export const AreaApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AreaApiFp(configuration)
    return {
        /**
         * Area
         * @summary Patch Area
         * @param {string} areaId 
         * @param {AreaPatch} areaPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        areaPatchArea(areaId: string, areaPatch: AreaPatch, options?: any): AxiosPromise<AreaOut> {
            return localVarFp.areaPatchArea(areaId, areaPatch, options).then((request) => request(axios, basePath));
        },
        /**
         * Area
         * @summary Create Area
         * @param {AreaIn} areaIn 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaCreateArea(areaIn: AreaIn, options?: any): AxiosPromise<AreaOut> {
            return localVarFp.trackerApiViewAreaCreateArea(areaIn, options).then((request) => request(axios, basePath));
        },
        /**
         * Area
         * @summary Delete Area
         * @param {string} areaId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaDeleteArea(areaId: string, options?: any): AxiosPromise<DeleteStatus> {
            return localVarFp.trackerApiViewAreaDeleteArea(areaId, options).then((request) => request(axios, basePath));
        },
        /**
         * Area
         * @summary Get Area
         * @param {string} areaId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaGetArea(areaId: string, options?: any): AxiosPromise<AreaOut> {
            return localVarFp.trackerApiViewAreaGetArea(areaId, options).then((request) => request(axios, basePath));
        },
        /**
         * Arean
         * @summary List Areas
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewAreaListAreas(options?: any): AxiosPromise<Array<AreaOut>> {
            return localVarFp.trackerApiViewAreaListAreas(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AreaApi - object-oriented interface
 * @export
 * @class AreaApi
 * @extends {BaseAPI}
 */
export class AreaApi extends BaseAPI {
    /**
     * Area
     * @summary Patch Area
     * @param {string} areaId 
     * @param {AreaPatch} areaPatch 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AreaApi
     */
    public areaPatchArea(areaId: string, areaPatch: AreaPatch, options?: AxiosRequestConfig) {
        return AreaApiFp(this.configuration).areaPatchArea(areaId, areaPatch, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Area
     * @summary Create Area
     * @param {AreaIn} areaIn 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AreaApi
     */
    public trackerApiViewAreaCreateArea(areaIn: AreaIn, options?: AxiosRequestConfig) {
        return AreaApiFp(this.configuration).trackerApiViewAreaCreateArea(areaIn, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Area
     * @summary Delete Area
     * @param {string} areaId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AreaApi
     */
    public trackerApiViewAreaDeleteArea(areaId: string, options?: AxiosRequestConfig) {
        return AreaApiFp(this.configuration).trackerApiViewAreaDeleteArea(areaId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Area
     * @summary Get Area
     * @param {string} areaId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AreaApi
     */
    public trackerApiViewAreaGetArea(areaId: string, options?: AxiosRequestConfig) {
        return AreaApiFp(this.configuration).trackerApiViewAreaGetArea(areaId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Arean
     * @summary List Areas
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AreaApi
     */
    public trackerApiViewAreaListAreas(options?: AxiosRequestConfig) {
        return AreaApiFp(this.configuration).trackerApiViewAreaListAreas(options).then((request) => request(this.axios, this.basePath));
    }
}

