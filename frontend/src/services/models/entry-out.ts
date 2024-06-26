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



/**
 * 
 * @export
 * @interface EntryOut
 */
export interface EntryOut {
    /**
     * 
     * @type {string}
     * @memberof EntryOut
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof EntryOut
     */
    'Timestamp': string;
    /**
     * 
     * @type {string}
     * @memberof EntryOut
     */
    'plant': string;
    /**
     * 
     * @type {string}
     * @memberof EntryOut
     */
    'notes'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof EntryOut
     */
    'plant_health': number;
    /**
     * 
     * @type {string}
     * @memberof EntryOut
     */
    'photo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof EntryOut
     */
    'user': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof EntryOut
     */
    'activities': Array<string>;
}

