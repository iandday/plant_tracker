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
import { HTTPValidationError } from '../models';
// @ts-ignore
import { ItemDelete } from '../models';
// @ts-ignore
import { Plant } from '../models';
// @ts-ignore
import { PlantCreate } from '../models';
// @ts-ignore
import { PlantPatch } from '../models';
// @ts-ignore
import { PlantReturn } from '../models';
/**
 * PlantApi - axios parameter creator
 * @export
 */
export const PlantApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create Plant
         * @param {PlantCreate} plantCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPlantPlantPost: async (plantCreate: PlantCreate, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantCreate' is not null or undefined
            assertParamExists('createPlantPlantPost', 'plantCreate', plantCreate)
            const localVarPath = `/plant`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(plantCreate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete Plant By Id
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePlantByIdPlantPlantIdDelete: async (plantId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('deletePlantByIdPlantPlantIdDelete', 'plantId', plantId)
            const localVarPath = `/plant/{plant_id}`
                .replace(`{${"plant_id"}}`, encodeURIComponent(String(plantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary Get Plant By Id
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantByIdPlantPlantIdGet: async (plantId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('getPlantByIdPlantPlantIdGet', 'plantId', plantId)
            const localVarPath = `/plant/{plant_id}`
                .replace(`{${"plant_id"}}`, encodeURIComponent(String(plantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary Get Plant
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantPlantGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/plant`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update Plant by ID
         * @summary Update Plant
         * @param {PlantPatch} plantPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePlantPlantPatch: async (plantPatch: PlantPatch, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantPatch' is not null or undefined
            assertParamExists('updatePlantPlantPatch', 'plantPatch', plantPatch)
            const localVarPath = `/plant`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(plantPatch, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PlantApi - functional programming interface
 * @export
 */
export const PlantApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PlantApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create Plant
         * @param {PlantCreate} plantCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPlantPlantPost(plantCreate: PlantCreate, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createPlantPlantPost(plantCreate, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.createPlantPlantPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Delete Plant By Id
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deletePlantByIdPlantPlantIdDelete(plantId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ItemDelete>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deletePlantByIdPlantPlantIdDelete(plantId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.deletePlantByIdPlantPlantIdDelete']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get Plant By Id
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPlantByIdPlantPlantIdGet(plantId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPlantByIdPlantPlantIdGet(plantId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.getPlantByIdPlantPlantIdGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get Plant
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPlantPlantGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PlantReturn>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPlantPlantGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.getPlantPlantGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Update Plant by ID
         * @summary Update Plant
         * @param {PlantPatch} plantPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePlantPlantPatch(plantPatch: PlantPatch, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Plant>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePlantPlantPatch(plantPatch, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.updatePlantPlantPatch']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * PlantApi - factory interface
 * @export
 */
export const PlantApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PlantApiFp(configuration)
    return {
        /**
         * 
         * @summary Create Plant
         * @param {PlantCreate} plantCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPlantPlantPost(plantCreate: PlantCreate, options?: any): AxiosPromise<Plant> {
            return localVarFp.createPlantPlantPost(plantCreate, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete Plant By Id
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deletePlantByIdPlantPlantIdDelete(plantId: string, options?: any): AxiosPromise<ItemDelete> {
            return localVarFp.deletePlantByIdPlantPlantIdDelete(plantId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Plant By Id
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantByIdPlantPlantIdGet(plantId: string, options?: any): AxiosPromise<Plant> {
            return localVarFp.getPlantByIdPlantPlantIdGet(plantId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Plant
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPlantPlantGet(options?: any): AxiosPromise<PlantReturn> {
            return localVarFp.getPlantPlantGet(options).then((request) => request(axios, basePath));
        },
        /**
         * Update Plant by ID
         * @summary Update Plant
         * @param {PlantPatch} plantPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePlantPlantPatch(plantPatch: PlantPatch, options?: any): AxiosPromise<Plant> {
            return localVarFp.updatePlantPlantPatch(plantPatch, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PlantApi - object-oriented interface
 * @export
 * @class PlantApi
 * @extends {BaseAPI}
 */
export class PlantApi extends BaseAPI {
    /**
     * 
     * @summary Create Plant
     * @param {PlantCreate} plantCreate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public createPlantPlantPost(plantCreate: PlantCreate, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).createPlantPlantPost(plantCreate, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete Plant By Id
     * @param {string} plantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public deletePlantByIdPlantPlantIdDelete(plantId: string, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).deletePlantByIdPlantPlantIdDelete(plantId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Plant By Id
     * @param {string} plantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public getPlantByIdPlantPlantIdGet(plantId: string, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).getPlantByIdPlantPlantIdGet(plantId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Plant
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public getPlantPlantGet(options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).getPlantPlantGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update Plant by ID
     * @summary Update Plant
     * @param {PlantPatch} plantPatch 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public updatePlantPlantPatch(plantPatch: PlantPatch, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).updatePlantPlantPatch(plantPatch, options).then((request) => request(this.axios, this.basePath));
    }
}

