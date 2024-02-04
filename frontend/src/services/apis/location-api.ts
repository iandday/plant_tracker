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
import { Location } from '../models';
// @ts-ignore
import { LocationCreate } from '../models';
// @ts-ignore
import { LocationPatch } from '../models';
// @ts-ignore
import { LocationReturn } from '../models';
/**
 * LocationApi - axios parameter creator
 * @export
 */
export const LocationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create Location
         * @param {LocationCreate} locationCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLocationLocationPost: async (locationCreate: LocationCreate, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'locationCreate' is not null or undefined
            assertParamExists('createLocationLocationPost', 'locationCreate', locationCreate)
            const localVarPath = `/location`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(locationCreate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete Location
         * @param {string} locationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLocationLocationLocationIdDelete: async (locationId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'locationId' is not null or undefined
            assertParamExists('deleteLocationLocationLocationIdDelete', 'locationId', locationId)
            const localVarPath = `/location/{location_id}`
                .replace(`{${"location_id"}}`, encodeURIComponent(String(locationId)));
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
         * @summary Get Location
         * @param {string} locationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLocationLocationLocationIdGet: async (locationId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'locationId' is not null or undefined
            assertParamExists('getLocationLocationLocationIdGet', 'locationId', locationId)
            const localVarPath = `/location/{location_id}`
                .replace(`{${"location_id"}}`, encodeURIComponent(String(locationId)));
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
         * @summary Get Locations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLocationsLocationGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/location`;
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
         * @summary Update Location
         * @param {string} locationId 
         * @param {LocationPatch} locationPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLocationLocationLocationIdPatch: async (locationId: string, locationPatch: LocationPatch, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'locationId' is not null or undefined
            assertParamExists('updateLocationLocationLocationIdPatch', 'locationId', locationId)
            // verify required parameter 'locationPatch' is not null or undefined
            assertParamExists('updateLocationLocationLocationIdPatch', 'locationPatch', locationPatch)
            const localVarPath = `/location/{location_id}`
                .replace(`{${"location_id"}}`, encodeURIComponent(String(locationId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(locationPatch, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LocationApi - functional programming interface
 * @export
 */
export const LocationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LocationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create Location
         * @param {LocationCreate} locationCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLocationLocationPost(locationCreate: LocationCreate, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Location>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createLocationLocationPost(locationCreate, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['LocationApi.createLocationLocationPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Delete Location
         * @param {string} locationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLocationLocationLocationIdDelete(locationId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ItemDelete>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteLocationLocationLocationIdDelete(locationId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['LocationApi.deleteLocationLocationLocationIdDelete']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get Location
         * @param {string} locationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLocationLocationLocationIdGet(locationId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Location>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLocationLocationLocationIdGet(locationId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['LocationApi.getLocationLocationLocationIdGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get Locations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLocationsLocationGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LocationReturn>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLocationsLocationGet(options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['LocationApi.getLocationsLocationGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Update Location
         * @param {string} locationId 
         * @param {LocationPatch} locationPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLocationLocationLocationIdPatch(locationId: string, locationPatch: LocationPatch, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Location>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateLocationLocationLocationIdPatch(locationId, locationPatch, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['LocationApi.updateLocationLocationLocationIdPatch']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * LocationApi - factory interface
 * @export
 */
export const LocationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LocationApiFp(configuration)
    return {
        /**
         * 
         * @summary Create Location
         * @param {LocationCreate} locationCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLocationLocationPost(locationCreate: LocationCreate, options?: any): AxiosPromise<Location> {
            return localVarFp.createLocationLocationPost(locationCreate, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete Location
         * @param {string} locationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLocationLocationLocationIdDelete(locationId: string, options?: any): AxiosPromise<ItemDelete> {
            return localVarFp.deleteLocationLocationLocationIdDelete(locationId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Location
         * @param {string} locationId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLocationLocationLocationIdGet(locationId: string, options?: any): AxiosPromise<Location> {
            return localVarFp.getLocationLocationLocationIdGet(locationId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Locations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLocationsLocationGet(options?: any): AxiosPromise<LocationReturn> {
            return localVarFp.getLocationsLocationGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update Location
         * @param {string} locationId 
         * @param {LocationPatch} locationPatch 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLocationLocationLocationIdPatch(locationId: string, locationPatch: LocationPatch, options?: any): AxiosPromise<Location> {
            return localVarFp.updateLocationLocationLocationIdPatch(locationId, locationPatch, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LocationApi - object-oriented interface
 * @export
 * @class LocationApi
 * @extends {BaseAPI}
 */
export class LocationApi extends BaseAPI {
    /**
     * 
     * @summary Create Location
     * @param {LocationCreate} locationCreate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public createLocationLocationPost(locationCreate: LocationCreate, options?: AxiosRequestConfig) {
        return LocationApiFp(this.configuration).createLocationLocationPost(locationCreate, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete Location
     * @param {string} locationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public deleteLocationLocationLocationIdDelete(locationId: string, options?: AxiosRequestConfig) {
        return LocationApiFp(this.configuration).deleteLocationLocationLocationIdDelete(locationId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Location
     * @param {string} locationId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public getLocationLocationLocationIdGet(locationId: string, options?: AxiosRequestConfig) {
        return LocationApiFp(this.configuration).getLocationLocationLocationIdGet(locationId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Locations
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public getLocationsLocationGet(options?: AxiosRequestConfig) {
        return LocationApiFp(this.configuration).getLocationsLocationGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update Location
     * @param {string} locationId 
     * @param {LocationPatch} locationPatch 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public updateLocationLocationLocationIdPatch(locationId: string, locationPatch: LocationPatch, options?: AxiosRequestConfig) {
        return LocationApiFp(this.configuration).updateLocationLocationLocationIdPatch(locationId, locationPatch, options).then((request) => request(this.axios, this.basePath));
    }
}

