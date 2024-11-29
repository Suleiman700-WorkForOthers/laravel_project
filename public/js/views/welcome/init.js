import fields from "./fields.js";

// ====================== [ Helpers ] ======================
import { loader } from "../../helpers/loader.js";
import { http } from "../../helpers/http.js";

window.addEventListener('load', async () => {
    await init();
});

const init = async () => {
    try {
        loader.show('Loading data...');

        // Get related data from the server
        const { data } = await http.get('/api/welcome/data');

        // Process the data here
        console.log('Received data:', data);

        loader.hide();
        loader.toast('Data loaded successfully');
    } catch (error) {
        loader.hide();
        loader.error('Failed to load data');
        console.error('Error:', error);
    }
}
