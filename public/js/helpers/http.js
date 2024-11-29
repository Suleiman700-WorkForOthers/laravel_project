import { loader } from './loader.js';

class Http {
    constructor() {
        this.baseUrl = window.location.origin;
        this.headers = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
        };
    }

    /**
     * Make a GET request
     * @param {string} url - The endpoint URL
     * @param {Object} params - Query parameters (optional)
     * @returns {Promise} - Response data
     */
    async get(url, params = {}) {
        try {
            // Add query parameters if they exist
            const queryString = new URLSearchParams(params).toString();
            const fullUrl = queryString ? `${url}?${queryString}` : url;

            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            loader.error(error.message);
            throw error;
        }
    }

    /**
     * Make a POST request
     * @param {string} url - The endpoint URL
     * @param {Object} data - The data to send
     * @returns {Promise} - Response data
     */
    async post(url, data = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            loader.error(error.message);
            throw error;
        }
    }

    /**
     * Make a PUT request
     * @param {string} url - The endpoint URL
     * @param {Object} data - The data to send
     * @returns {Promise} - Response data
     */
    async put(url, data = {}) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            loader.error(error.message);
            throw error;
        }
    }

    /**
     * Make a DELETE request
     * @param {string} url - The endpoint URL
     * @returns {Promise} - Response data
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            loader.error(error.message);
            throw error;
        }
    }
}

// Export a single instance to be used throughout the application
export const http = new Http();
