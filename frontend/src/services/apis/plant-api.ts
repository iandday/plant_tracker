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
import { DeleteStatus } from '../models';
// @ts-ignore
import { PlantOut } from '../models';
/**
 * PlantApi - axios parameter creator
 * @export
 */
export const PlantApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Plant
         * @summary Create Plant
         * @param {string} areaId 
         * @param {string} name 
         * @param {string} [purchaseDate] 
         * @param {boolean} [graveyard] 
         * @param {string} [deathDate] 
         * @param {string | null} [commonName] 
         * @param {string | null} [scientificName] 
         * @param {string | null} [notes] 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantCreatePlant: async (areaId: string, name: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'areaId' is not null or undefined
            assertParamExists('trackerApiViewPlantCreatePlant', 'areaId', areaId)
            // verify required parameter 'name' is not null or undefined
            assertParamExists('trackerApiViewPlantCreatePlant', 'name', name)
            const localVarPath = `/api/plant/plant`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            if (areaId !== undefined) { 
                localVarFormParams.append('area_id', areaId as any);
            }
    
            if (purchaseDate !== undefined) { 
                localVarFormParams.append('purchase_date', purchaseDate as any);
            }
    
            if (graveyard !== undefined) { 
                localVarFormParams.append('graveyard', graveyard as any);
            }
    
            if (deathDate !== undefined) { 
                localVarFormParams.append('death_date', deathDate as any);
            }
    
            if (name !== undefined) { 
                localVarFormParams.append('name', name as any);
            }
    
            if (commonName !== undefined) { 
                localVarFormParams.append('common_name', commonName as any);
            }
    
            if (scientificName !== undefined) { 
                localVarFormParams.append('scientific_name', scientificName as any);
            }
    
            if (notes !== undefined) { 
                localVarFormParams.append('notes', notes as any);
            }
    
            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Plant
         * @summary Delete Plant
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantDeletePlant: async (plantId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('trackerApiViewPlantDeletePlant', 'plantId', plantId)
            const localVarPath = `/api/plant/{plant_id}`
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
         * Plant
         * @summary Get Plant
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantGetPlant: async (plantId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('trackerApiViewPlantGetPlant', 'plantId', plantId)
            const localVarPath = `/api/plant/{plant_id}`
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
         * Plant
         * @summary List Plants
         * @param {boolean} [excludeGraveyard] 
         * @param {boolean} [graveyardOnly] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantListPlants: async (excludeGraveyard?: boolean, graveyardOnly?: boolean, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/plant/plant`;
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

            if (excludeGraveyard !== undefined) {
                localVarQueryParameter['exclude_graveyard'] = excludeGraveyard;
            }

            if (graveyardOnly !== undefined) {
                localVarQueryParameter['graveyard_only'] = graveyardOnly;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Plant
         * @summary Post Plant
         * @param {string} plantId 
         * @param {string} [areaId] 
         * @param {string} [purchaseDate] 
         * @param {boolean} [graveyard] 
         * @param {string} [deathDate] 
         * @param {string | null} [name] 
         * @param {string | null} [commonName] 
         * @param {string | null} [scientificName] 
         * @param {string | null} [notes] 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantPostPlant: async (plantId: string, areaId?: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, name?: string | null, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'plantId' is not null or undefined
            assertParamExists('trackerApiViewPlantPostPlant', 'plantId', plantId)
            const localVarPath = `/api/plant/{plant_id}`
                .replace(`{${"plant_id"}}`, encodeURIComponent(String(plantId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication JWTAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            if (areaId !== undefined) { 
                localVarFormParams.append('area_id', areaId as any);
            }
    
            if (purchaseDate !== undefined) { 
                localVarFormParams.append('purchase_date', purchaseDate as any);
            }
    
            if (graveyard !== undefined) { 
                localVarFormParams.append('graveyard', graveyard as any);
            }
    
            if (deathDate !== undefined) { 
                localVarFormParams.append('death_date', deathDate as any);
            }
    
            if (name !== undefined) { 
                localVarFormParams.append('name', name as any);
            }
    
            if (commonName !== undefined) { 
                localVarFormParams.append('common_name', commonName as any);
            }
    
            if (scientificName !== undefined) { 
                localVarFormParams.append('scientific_name', scientificName as any);
            }
    
            if (notes !== undefined) { 
                localVarFormParams.append('notes', notes as any);
            }
    
            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

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
         * Plant
         * @summary Create Plant
         * @param {string} areaId 
         * @param {string} name 
         * @param {string} [purchaseDate] 
         * @param {boolean} [graveyard] 
         * @param {string} [deathDate] 
         * @param {string | null} [commonName] 
         * @param {string | null} [scientificName] 
         * @param {string | null} [notes] 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewPlantCreatePlant(areaId: string, name: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PlantOut>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewPlantCreatePlant(areaId, name, purchaseDate, graveyard, deathDate, commonName, scientificName, notes, file, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.trackerApiViewPlantCreatePlant']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Plant
         * @summary Delete Plant
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewPlantDeletePlant(plantId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeleteStatus>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewPlantDeletePlant(plantId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.trackerApiViewPlantDeletePlant']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Plant
         * @summary Get Plant
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewPlantGetPlant(plantId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PlantOut>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewPlantGetPlant(plantId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.trackerApiViewPlantGetPlant']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Plant
         * @summary List Plants
         * @param {boolean} [excludeGraveyard] 
         * @param {boolean} [graveyardOnly] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewPlantListPlants(excludeGraveyard?: boolean, graveyardOnly?: boolean, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<PlantOut>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewPlantListPlants(excludeGraveyard, graveyardOnly, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.trackerApiViewPlantListPlants']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * Plant
         * @summary Post Plant
         * @param {string} plantId 
         * @param {string} [areaId] 
         * @param {string} [purchaseDate] 
         * @param {boolean} [graveyard] 
         * @param {string} [deathDate] 
         * @param {string | null} [name] 
         * @param {string | null} [commonName] 
         * @param {string | null} [scientificName] 
         * @param {string | null} [notes] 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackerApiViewPlantPostPlant(plantId: string, areaId?: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, name?: string | null, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PlantOut>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackerApiViewPlantPostPlant(plantId, areaId, purchaseDate, graveyard, deathDate, name, commonName, scientificName, notes, file, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['PlantApi.trackerApiViewPlantPostPlant']?.[index]?.url;
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
         * Plant
         * @summary Create Plant
         * @param {string} areaId 
         * @param {string} name 
         * @param {string} [purchaseDate] 
         * @param {boolean} [graveyard] 
         * @param {string} [deathDate] 
         * @param {string | null} [commonName] 
         * @param {string | null} [scientificName] 
         * @param {string | null} [notes] 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantCreatePlant(areaId: string, name: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options?: any): AxiosPromise<PlantOut> {
            return localVarFp.trackerApiViewPlantCreatePlant(areaId, name, purchaseDate, graveyard, deathDate, commonName, scientificName, notes, file, options).then((request) => request(axios, basePath));
        },
        /**
         * Plant
         * @summary Delete Plant
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantDeletePlant(plantId: string, options?: any): AxiosPromise<DeleteStatus> {
            return localVarFp.trackerApiViewPlantDeletePlant(plantId, options).then((request) => request(axios, basePath));
        },
        /**
         * Plant
         * @summary Get Plant
         * @param {string} plantId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantGetPlant(plantId: string, options?: any): AxiosPromise<PlantOut> {
            return localVarFp.trackerApiViewPlantGetPlant(plantId, options).then((request) => request(axios, basePath));
        },
        /**
         * Plant
         * @summary List Plants
         * @param {boolean} [excludeGraveyard] 
         * @param {boolean} [graveyardOnly] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantListPlants(excludeGraveyard?: boolean, graveyardOnly?: boolean, options?: any): AxiosPromise<Array<PlantOut>> {
            return localVarFp.trackerApiViewPlantListPlants(excludeGraveyard, graveyardOnly, options).then((request) => request(axios, basePath));
        },
        /**
         * Plant
         * @summary Post Plant
         * @param {string} plantId 
         * @param {string} [areaId] 
         * @param {string} [purchaseDate] 
         * @param {boolean} [graveyard] 
         * @param {string} [deathDate] 
         * @param {string | null} [name] 
         * @param {string | null} [commonName] 
         * @param {string | null} [scientificName] 
         * @param {string | null} [notes] 
         * @param {File} [file] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackerApiViewPlantPostPlant(plantId: string, areaId?: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, name?: string | null, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options?: any): AxiosPromise<PlantOut> {
            return localVarFp.trackerApiViewPlantPostPlant(plantId, areaId, purchaseDate, graveyard, deathDate, name, commonName, scientificName, notes, file, options).then((request) => request(axios, basePath));
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
     * Plant
     * @summary Create Plant
     * @param {string} areaId 
     * @param {string} name 
     * @param {string} [purchaseDate] 
     * @param {boolean} [graveyard] 
     * @param {string} [deathDate] 
     * @param {string | null} [commonName] 
     * @param {string | null} [scientificName] 
     * @param {string | null} [notes] 
     * @param {File} [file] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public trackerApiViewPlantCreatePlant(areaId: string, name: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).trackerApiViewPlantCreatePlant(areaId, name, purchaseDate, graveyard, deathDate, commonName, scientificName, notes, file, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Plant
     * @summary Delete Plant
     * @param {string} plantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public trackerApiViewPlantDeletePlant(plantId: string, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).trackerApiViewPlantDeletePlant(plantId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Plant
     * @summary Get Plant
     * @param {string} plantId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public trackerApiViewPlantGetPlant(plantId: string, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).trackerApiViewPlantGetPlant(plantId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Plant
     * @summary List Plants
     * @param {boolean} [excludeGraveyard] 
     * @param {boolean} [graveyardOnly] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public trackerApiViewPlantListPlants(excludeGraveyard?: boolean, graveyardOnly?: boolean, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).trackerApiViewPlantListPlants(excludeGraveyard, graveyardOnly, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Plant
     * @summary Post Plant
     * @param {string} plantId 
     * @param {string} [areaId] 
     * @param {string} [purchaseDate] 
     * @param {boolean} [graveyard] 
     * @param {string} [deathDate] 
     * @param {string | null} [name] 
     * @param {string | null} [commonName] 
     * @param {string | null} [scientificName] 
     * @param {string | null} [notes] 
     * @param {File} [file] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlantApi
     */
    public trackerApiViewPlantPostPlant(plantId: string, areaId?: string, purchaseDate?: string, graveyard?: boolean, deathDate?: string, name?: string | null, commonName?: string | null, scientificName?: string | null, notes?: string | null, file?: File, options?: AxiosRequestConfig) {
        return PlantApiFp(this.configuration).trackerApiViewPlantPostPlant(plantId, areaId, purchaseDate, graveyard, deathDate, name, commonName, scientificName, notes, file, options).then((request) => request(this.axios, this.basePath));
    }
}

