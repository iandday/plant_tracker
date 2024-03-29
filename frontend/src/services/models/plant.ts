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


// May contain unused imports in some cases
// @ts-ignore
import { Entry } from './entry';
// May contain unused imports in some cases
// @ts-ignore
import { Source } from './source';

/**
 * 
 * @export
 * @interface Plant
 */
export interface Plant {
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'photo_url'?: string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'area_id': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'common_name': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'scientific_name': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'purchase_date'?: string | null;
    /**
     * 
     * @type {Array<Source>}
     * @memberof Plant
     */
    'sources'?: Array<Source>;
    /**
     * 
     * @type {number}
     * @memberof Plant
     */
    'trefle_id'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'user_id': string;
    /**
     * 
     * @type {Array<Entry>}
     * @memberof Plant
     */
    'entries'?: Array<Entry>;
    /**
     * 
     * @type {boolean}
     * @memberof Plant
     */
    'graveyard'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof Plant
     */
    'death_date'?: string | null;
}

