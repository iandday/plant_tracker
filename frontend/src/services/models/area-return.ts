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
import { Area } from './area';

/**
 * 
 * @export
 * @interface AreaReturn
 */
export interface AreaReturn {
    /**
     * 
     * @type {number}
     * @memberof AreaReturn
     */
    'count': number;
    /**
     * 
     * @type {Array<Area>}
     * @memberof AreaReturn
     */
    'results': Array<Area>;
}
