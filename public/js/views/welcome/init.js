import elements from "./elements.js";

// ====================== [ Classes ] ======================
import Vertical_Table from "../../plugins/table/Vertical_Table.js";
import Customers from "../../classes/Customers.js";

// ====================== [ Events ] ======================
import EventBus from "../../plugins/events/event_bus/EventBus.js";
import { events } from "./events.js";

// ====================== [ Helpers ] ======================
import { loader } from "../../helpers/loader.js";
import { http } from "../../helpers/http.js";
import { callDurationFormatter } from "../../helpers/text_formatter.js";

const _STORAGE = {
    agents: [],
    customers: [],
    agentCustomers: {}, // { agentId: [customers] }
    customerDetails: {}, // { customerId: {} }
};

const CustomerInstance = new Customers();
const EventBusInstance = new EventBus();

// Listen to init event - just for testing
EventBusInstance.on(events.init.name, (_data) => {
    console.log(_data);
});

window.addEventListener('load', async () => {
    await init();
});

const init = async () => {
    try {
        loader.show('Loading data...');

        // Get related data from the server - one request to get relevant data and prevent multiple requests
        const response = await http.get('api/calls');
        _STORAGE.agents = response.agents;
        _STORAGE.customers = response.customers;

        // Function to fetch table data
        const fetchTableData = async (filters) => {
            loader.show('Loading data...');

            try {
                // In production, this would be an API call
                // const response = await http.get('api/calls/by-filters', filters);
                
                // For now, using dummy data
                const response = [
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",
                        "comment": "I've told the customer about the new internet plan and he accepted it and liked the plan price",
                        "duration": "00:35:00",
                        "date": "2024-11-29",
                        "customer_name": "John Smith",
                        "agent_name": "Anna"
                    },
                    {
                        "id": 1,
                        "agent_id": 1,
                        "customer_id": 1,
                        "title": "Telling customer about internet plan",