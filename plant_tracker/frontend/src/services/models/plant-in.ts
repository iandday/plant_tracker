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
 * @interface PlantIn
 */
export interface PlantIn {
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'area_id': string;
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'purchase_date'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PlantIn
     */
    'graveyard'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'death_date'?: string;
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'common_name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'scientific_name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PlantIn
     */
    'notes'?: string | null;
}

