import InputManager from "../../plugins/element-manager/Input_Manager.js";


const fields = {
    "search": new InputManager('section_filters', 'search'),
    "status": new InputManager('section_filters', 'status')
};

export default fields;