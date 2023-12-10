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
import { Location } from './location';
// May contain unused imports in some cases
// @ts-ignore
import { SourceCreate } from './source-create';

/**
 * 
 * @export
 * @interface PlantCreate
 */
export interface PlantCreate {
    /**
     * 
     * @type {string}
     * @memberof PlantCreate
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof PlantCreate
     */
    'photo_url'?: string;
    /**
     * 
     * @type {Location}
     * @memberof PlantCreate
     */
    'location': Location;
    /**
     * 
     * @type {string}
     * @memberof PlantCreate
     */
    'common_name': string;
    /**
     * 
     * @type {string}
     * @memberof PlantCreate
     */
    'scientific_name': string;
    /**
     * 
     * @type {Array<SourceCreate>}
     * @memberof PlantCreate
     */
    'sources'?: Array<SourceCreate>;
    /**
     * 
     * @type {number}
     * @memberof PlantCreate
     */
    'purchase_year'?: number;
    /**
     * 
     * @type {number}
     * @memberof PlantCreate
     */
    'purchase_month'?: number;
    /**
     * 
     * @type {number}
     * @memberof PlantCreate
     */
    'purchase_day'?: number;
}

