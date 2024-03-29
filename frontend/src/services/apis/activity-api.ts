/* tslint:disable */
/* eslint-disable */
/**
 * Plant Tracker API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
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
import { Activity } from '../models';
// @ts-ignore
import { ActivityCreate } from '../models';
// @ts-ignore
import { ActivityPatch } from '../models';
// @ts-ignore
import { ActivityReturn } from '../models';
// @ts-ignore
import { HTTPValidationError } from '../models';
// @ts-ignore
import { ItemDelete } from '../models';
/**
 * ActivityApi - axios parameter creator
 * @export
 */
export const ActivityApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create Activity
         * @param {ActivityCreate} activityCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createActivityActivityPost: async (activityCreate: ActivityCreate, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'activityCreate' is not null or undefined
            assertParamExists('createActivityActivityPost', 'activityCreate', activityCreate)
            const localVarPath = `/activity`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "JWT", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(activityCreate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete Activity
         * @param {string} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteActivityActivityActivityIdDelete: async (activityId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'activityId' is not null or undefined
            assertParamExists('deleteActivityActivityActivityIdDelete', 'activityId', activityId)
            const localVarPath = `/activity/{activity_id}`
                .replace(`{${"activity_id"}}`, encodeURIComponent(String(activityId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "JWT", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Activity
         * @param {string} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActivityActivityActivityIdGet: async (activityId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'activityId' is not null or undefined
            assertParamExists('getActivityActivityActivityIdGet', 'activityId', activityId)
            const localVarPath = `/activity/{activity_id}`
                .replace(`{${"activity_id"}}`, encodeURIComponent(String(activityId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "JWT", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Activitys
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActivitysActivityGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/activity`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "JWT", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update Activity
         * @param {string} activityId 
         * @param {ActivityPatch} activityPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateActivityActivityActivityIdPatch: async (activityId: string, activityPatch: ActivityPatch, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'activityId' is not null or undefined
            assertParamExists('updateActivityActivityActivityIdPatch', 'activityId', activityId)
            // verify required parameter 'activityPatch' is not null or undefined
            assertParamExists('updateActivityActivityActivityIdPatch', 'activityPatch', activityPatch)
            const localVarPath = `/activity/{activity_id}`
                .replace(`{${"activity_id"}}`, encodeURIComponent(String(activityId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "JWT", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(activityPatch, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ActivityApi - functional programming interface
 * @export
 */
export const ActivityApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ActivityApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create Activity
         * @param {ActivityCreate} activityCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createActivityActivityPost(activityCreate: ActivityCreate, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Activity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createActivityActivityPost(activityCreate, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['ActivityApi.createActivityActivityPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Delete Activity
         * @param {string} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteActivityActivityActivityIdDelete(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ItemDelete>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteActivityActivityActivityIdDelete(activityId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['ActivityApi.deleteActivityActivityActivityIdDelete']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get Activity
         * @param {string} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActivityActivityActivityIdGet(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Activity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActivityActivityActivityIdGet(activityId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['ActivityApi.getActivityActivityActivityIdGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get Activitys
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActivitysActivityGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ActivityReturn>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActivitysActivityGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['ActivityApi.getActivitysActivityGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Update Activity
         * @param {string} activityId 
         * @param {ActivityPatch} activityPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateActivityActivityActivityIdPatch(activityId: string, activityPatch: ActivityPatch, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Activity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateActivityActivityActivityIdPatch(activityId, activityPatch, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['ActivityApi.updateActivityActivityActivityIdPatch']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * ActivityApi - factory interface
 * @export
 */
export const ActivityApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ActivityApiFp(configuration)
    return {
        /**
         * 
         * @summary Create Activity
         * @param {ActivityCreate} activityCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createActivityActivityPost(activityCreate: ActivityCreate, options?: any): AxiosPromise<Activity> {
            return localVarFp.createActivityActivityPost(activityCreate, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete Activity
         * @param {string} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteActivityActivityActivityIdDelete(activityId: string, options?: any): AxiosPromise<ItemDelete> {
            return localVarFp.deleteActivityActivityActivityIdDelete(activityId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Activity
         * @param {string} activityId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActivityActivityActivityIdGet(activityId: string, options?: any): AxiosPromise<Activity> {
            return localVarFp.getActivityActivityActivityIdGet(activityId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Activitys
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActivitysActivityGet(options?: any): AxiosPromise<ActivityReturn> {
            return localVarFp.getActivitysActivityGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update Activity
         * @param {string} activityId 
         * @param {ActivityPatch} activityPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateActivityActivityActivityIdPatch(activityId: string, activityPatch: ActivityPatch, options?: any): AxiosPromise<Activity> {
            return localVarFp.updateActivityActivityActivityIdPatch(activityId, activityPatch, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ActivityApi - object-oriented interface
 * @export
 * @class ActivityApi
 * @extends {BaseAPI}
 */
export class ActivityApi extends BaseAPI {
    /**
     * 
     * @summary Create Activity
     * @param {ActivityCreate} activityCreate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public createActivityActivityPost(activityCreate: ActivityCreate, options?: AxiosRequestConfig) {
        return ActivityApiFp(this.configuration).createActivityActivityPost(activityCreate, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete Activity
     * @param {string} activityId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public deleteActivityActivityActivityIdDelete(activityId: string, options?: AxiosRequestConfig) {
        return ActivityApiFp(this.configuration).deleteActivityActivityActivityIdDelete(activityId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Activity
     * @param {string} activityId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public getActivityActivityActivityIdGet(activityId: string, options?: AxiosRequestConfig) {
        return ActivityApiFp(this.configuration).getActivityActivityActivityIdGet(activityId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Activitys
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public getActivitysActivityGet(options?: AxiosRequestConfig) {
        return ActivityApiFp(this.configuration).getActivitysActivityGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update Activity
     * @param {string} activityId 
     * @param {ActivityPatch} activityPatch 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public updateActivityActivityActivityIdPatch(activityId: string, activityPatch: ActivityPatch, options?: AxiosRequestConfig) {
        return ActivityApiFp(this.configuration).updateActivityActivityActivityIdPatch(activityId, activityPatch, options).then((request) => request(this.axios, this.basePath));
    }
}

