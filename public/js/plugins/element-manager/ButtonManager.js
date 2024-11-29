export default class ButtonManager {
    constructor(_parentId, _id) {
        this.parentId = _parentId;
        this.id = _id;

        // Check if element exists
        this.doesExist();
    }

    /**
     * Check if element exists
     * @returns {boolean}
     */
    doesExist() {
        if (document.querySelector(`#${this.parentId} #${this.id}`) !== null) {
            return true;
        } else {
            console.error(`[ButtonManager] Button #${this.id} does not exist in parent #${this.parentId}`);
            return false;
        }
    }

    /**
     * Enable or disable the button
     * @param _option {Boolean}
     */
    isEnabled(_option) {
        document.querySelector(`#${this.parentId} button#${this.id}`).disabled = !_option;
    }

    /**
     * Show or hide the button
     * @param _option {Boolean}
     */
    isVisible(_option) {
        const button = document.querySelector(`#${this.parentId} button#${this.id}`);
        button.style.display = _option ? '' : 'none';
    }

    /**
     * Set the button text
     * @param _text {string}
     */
    setText(_text) {
        const button = document.querySelector(`#${this.parentId} button#${this.id}`);
        button.textContent = _text;
    }

    /**
     * Get the button text
     * @returns {string}
     */
    getText() {
        return document.querySelector(`#${this.parentId} button#${this.id}`).textContent;
    }

    /**
     * Add click event handler
     * @param _callback {Function}
     */
    onClick(_callback) {
        if (typeof _callback !== 'function') {
            console.error('[ButtonManager] onClick callback must be a function');
            return;
        }
        const button = document.querySelector(`#${this.parentId} button#${this.id}`);
        button.addEventListener('click', _callback);
    }

    /**
     * Add loading state to button
     * @param _isLoading {Boolean}
     * @param _loadingText {string} Optional loading text
     */
    setLoading(_isLoading, _loadingText = 'Loading...') {
        const button = document.querySelector(`#${this.parentId} button#${this.id}`);
        if (_isLoading) {
            this.originalText = button.textContent;
            button.textContent = _loadingText;
            button.disabled = true;
        } else {
            button.textContent = this.originalText || '';
            button.disabled = false;
        }
    }

    /**
     * Add/Remove classes from button
     * @param _classes {string[]} Array of class names
     * @param _add {Boolean} True to add, false to remove
     */
    toggleClasses(_classes, _add = true) {
        if (!Array.isArray(_classes)) {
            console.error('[ButtonManager] toggleClasses requires an array of class names');
            return;
        }
        const button = document.querySelector(`#${this.parentId} button#${this.id}`);
        _classes.forEach(className => {
            if (_add) {
                button.classList.add(className);
            } else {
                button.classList.remove(className);
            }
        });
    }
}