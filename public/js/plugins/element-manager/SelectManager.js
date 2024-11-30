/*
This class is responsible for managing select elements (NOT SELECT2!)
*/

export default class SelectManager {
    constructor(_parentId, _id, _cb=null) {
        this.parentId = _parentId
        this.id = _id
        this.cb = _cb

        // Store all options
        this.options = []
        
        // Store the selected option
        this.selectedOption = {
            value: undefined,
            text: undefined
        }

        this.section = document.getElementById(_parentId);
        this.element = document.getElementById(_id);
    }

    /**
     * Check if options are set
     * @returns {boolean}
     */
    areOptionsSet() {
        return !!this.options.length;
    }

    /**
     * Clear all options from the select
     */
    clearOptions() {
        if (this.element) {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }    
        }
    }

    /**
     * Deselect selected option
     */
    deselect() {
        if (this.element) {
            this.element.value = null;
            this.element.dispatchEvent(new Event('change'));    
        }
    }

    /**
     * Enable or disable the select
     * @param _option {Boolean}
     */
    isEnabled(_option) {
        this.element.disabled = !_option
    }

    /**
     * Enable onChange event listener
     */
    enableOnChangeEvent() {
        this.element.addEventListener('change', () => {
            this.selectedOption['value'] = this.get_selected_value()
            // this.selectedOption['text'] = this.get_selected_text()
            this.cb(this)
        })
    }

    /**
     * Put options into select
     * @param _options {Object}
     * @param _value {string} > The key to save for selected['id']
     * @param _text {string} > The key to save for selected['text']
     */
    put_options(_options, _value, _text) {
        // Clear existing options
        this.clearOptions()

        // Add empty option
        this.deselect()

        // Check if options is array
        if (!Array.isArray(_options)) {
            console.error('Options must be an array')
            return
        }

        // Add new options
        for (const option of _options) {
            const isDisabled = option['disabled'] ? true : false
            const isSelected = option['selected'] ? true : false

            const newOption = document.createElement('option');
            newOption.value = option[_value];
            newOption.textContent = option[_text];
            newOption.disabled = isDisabled;
            newOption.selected = isSelected;
            this.element.appendChild(newOption)
        }

        // Trigger change event if any option was selected
        if (_options.some(opt => opt['selected'])) {
            this.element.dispatchEvent(new Event('change'));
        }

        // Save passed select options
        this.saveOptions(_options)
    }

    /**
     * Save select options
     * @param _options {object}
     */
    saveOptions(_options) {
        this.options = _options
    }

    /**
     * Set selected option by value
     * @param _value {string|number}
     */
    set_selected_option_by_value(_value) {
        this.element.value = _value
        this.element.dispatchEvent(new Event('change'));
    }

    /**
     * Get selected option's value
     * @return {string}
     */
    get_selected_value() {
        return this.element.value
    }

    /**
     * Get selected option's text
     * @return {string}
     */
    get_selected_text() {
        const select = this.element;
        return select.options[select.selectedIndex].text
    }

    /**
     * check if option is selected
     * please note than this method checks if the selected option's value is null which means not-selected
     * @return {boolean}
     */
    isSelected() {
        // get selected value
        const selectedValue = this.get_selected_value()

        // check selected value
        if (selectedValue == 'null') return false
        else return true
    }

    /**
     * Get element
     * @return {HTML}
     */
    getElement() {
        return document.querySelector(`#${this.parentId} select#${this.id}`)
    }
}