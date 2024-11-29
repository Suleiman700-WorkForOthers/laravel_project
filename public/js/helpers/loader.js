class Loader {
    constructor() {
        this.isLoading = false;
        this.loaderInstance = null;
    }

    /**
     * Show loading overlay with custom message
     * @param {string} message - Loading message to display
     * @returns {Promise} - SweetAlert2 instance
     */
    show(message = 'Loading...') {
        if (this.isLoading) return;

        this.isLoading = true;
        this.loaderInstance = Swal.fire({
            title: message,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        return this.loaderInstance;
    }

    /**
     * Hide the loading overlay
     */
    hide() {
        if (!this.isLoading) return;

        this.isLoading = false;
        if (this.loaderInstance) {
            Swal.close();
            this.loaderInstance = null;
        }
    }

    /**
     * Show success message
     * @param {string} message - Success message to display
     * @param {string} title - Optional title for the success message
     * @returns {Promise} - SweetAlert2 instance
     */
    success(message, title = 'Success') {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            timer: 1500,
            showConfirmButton: false
        });
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     * @param {string} title - Optional title for the error message
     * @returns {Promise} - SweetAlert2 instance
     */
    error(message, title = 'Error') {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: message
        });
    }

    /**
     * Show warning message with confirmation
     * @param {string} message - Warning message to display
     * @param {string} title - Optional title for the warning message
     * @returns {Promise} - Returns true if confirmed, false otherwise
     */
    async confirm(message, title = 'Are you sure?') {
        const result = await Swal.fire({
            icon: 'warning',
            title: title,
            text: message,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        });

        return result.isConfirmed;
    }

    /**
     * Show custom toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type of toast (success, error, warning, info)
     */
    toast(message, type = 'success') {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        Toast.fire({
            icon: type,
            title: message
        });
    }
}

// Export a single instance to be used throughout the application
export const loader = new Loader();