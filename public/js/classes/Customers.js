
import {http} from '../helpers/http.js';

export default class Customers {
    constructor() {}

    /**
     * Get customer data by id
     * @param {number} _customerId 
     */
    async getData(_customerId) {
        const response = await http.get(`api/customers/${_customerId}`);
        return response;
    }
}