import InputManager from "../../plugins/element-manager/Input_Manager.js";
import SelectManager from "../../plugins/element-manager/SelectManager.js";
import ButtonManager from "../../plugins/element-manager/ButtonManager.js";

const elements = {
    inputs: {
        date: new InputManager('section_filters', 'date-range'),
    },
    selects: {
        agent: new SelectManager('section_filters', 'select-agent'),
        customer: new SelectManager('section_filters', 'select-customers'),
    },
    buttons: {
        filter: {
            reset: new ButtonManager('section_filters', 'filter-reset'),
            submit: new ButtonManager('section_filters', 'filter-submit'),
        },
    },
};

export default elements;