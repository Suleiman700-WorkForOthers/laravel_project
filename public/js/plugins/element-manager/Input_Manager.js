
export default class InputManager {
    constructor(_parentId, _id) {
        this.parentId = _parentId
        this.id = _id

        // Check if element exists
        this.doesExist()
    }

    /**
     * Check if element exists
     * @returns {boolean}
     */
    doesExist() {
        if (document.querySelector(`#${this.parentId} #${this.id}`) !== null) {
            return true
        }
        else {
            console.error(`[InputManager] Input #${this.id} does not exist in parent #${this.parentId}`)
            return false
        }
    }

    /**
     * Enable or disable the input
     * @param _option {Boolean}
     */
    enabled(_option) {
        document.querySelector(`#${this.parentId} input#${this.id}`).disabled = !_option
    }

    /**
     * Clear the input value
     */
    valueClear() {
        // $: indicates that is it an element
        const $input = document.querySelector(`#${this.parentId} input#${this.id}`)

        // Set value
        $input.value = ''

        // Trigger change event
        $input.dispatchEvent(new Event('change'));
    }

    /**
     * Get the value of the input
     * @returns {string|undefined}
     */
    valueGet() {
        const value = document.querySelector(`#${this.parentId} input#${this.id}`).value
        if (!value.trim().length || !value.length) return ''
        else return value
    }

    /**
     * Set the value on the input
     * @param _value {string}
     */
    valueSet(_value) {
        // $: indicates that is it an element
        const $input = document.querySelector(`#${this.parentId} input#${this.id}`)

        // Set value
        $input.value = _value

        // Trigger change event
        $input.dispatchEvent(new Event('change'));
    }

    getElement() {
        return document.querySelector(`#${this.parentId} input#${this.id}`)
    }
}