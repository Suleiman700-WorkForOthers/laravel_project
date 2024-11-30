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

        // Prepare table
        const table = new Vertical_Table('#test-table', {
            tbody: [
                { key: 'agent_name', title: 'Agent', method: 'text' },
                { key: 'customer_name', title: 'Customer', method: 'function', callback: (row, column) => {
                    const customer = row[column.key];

                    const div = document.createElement('div');
                    const span = document.createElement('span');
                    span.textContent = customer;
                    div.appendChild(span);

                    const badge = document.createElement('span');
                    badge.className = 'badge bg-success mx-1';
                    badge.style.cursor = 'pointer';
                    badge.innerHTML = '<i class="fas fa-eye"></i> Info';
                    badge.addEventListener('click', async () => {

                        let customerData = {};

                        // Check if customer details are already stored - prevent sending another request
                        if (_STORAGE.customerDetails[row.customer_id]) {
                            customerData = _STORAGE.customerDetails[row.customer_id];
                        }
                        else {
                            // Get customer details
                            loader.show('Loading customer details...');
                            const customerDetails = await CustomerInstance.getData(row.customer_id);
                            loader.hide();

                            if (!customerDetails.state) {
                                loader.error('Failed to get customer details');
                                return;
                            }

                            // Store customer details
                            _STORAGE.customerDetails[row.customer_id] = customerDetails.data;
                            customerData = customerDetails.data;
                        }



                        Swal.fire({
                            title: 'Customer Details',
                            html: `
                                <p><strong>Name:</strong> ${customerData.name}</p>
                                <p><strong>Mobile:</strong> ${customerData.mobile}</p>
                                <p><strong>Email:</strong> ${customerData.email}</p>
                                <p><strong>Address:</strong> ${customerData.address}</p>
                            `,
                            confirmButtonText: 'Close',
                        })
                    });
                    div.appendChild(badge); 
                    return div;
                } },
                { key: 'title', title: 'Title', method: 'function', callback: (row, column) => {
                    const title = row[column.key];
                    return title.length > 20 ? `${title.substring(0, 20)}...` : title;
                } },
                { key: 'duration', title: 'Duration', method: 'function', callback: (row, column) => callDurationFormatter(row[column.key]) },
                { key: 'date', title: 'Date', method: 'function', callback: (row, column) => {
                    const date = new Date(row[column.key]);
                    return date.toLocaleDateString('en-IL', { year: 'numeric', month: '2-digit', day: '2-digit' });
                } },
                { title: 'Actions', method: 'function', callback: (row, column) => {
                    const div = document.createElement('div');

                    const viewButton = document.createElement('button');
                    viewButton.className = 'btn btn-sm btn-primary';
                    viewButton.innerHTML = '<i class="fas fa-eye me-1"></i> View';
                    viewButton.setAttribute('data-id', row.id);
                    viewButton.addEventListener('click', () => {
                        Swal.fire({
                            title: 'Call Details',
                            html: `
                                <p><strong>Agent:</strong> ${row.agent_name}</p>
                                <p><strong>Customer:</strong> ${row.customer_name}</p>
                                <p><strong>Duration:</strong> ${callDurationFormatter(row.duration)}</p>
                                <p><strong>Date:</strong> ${row.date}</p>
                                <p><strong>Title:</strong> ${row.title}</p>
                                <p><strong>Comment:</strong> ${row.comment}</p>
                            `,
                            confirmButtonText: 'Close',
                        })
                    });
                    div.appendChild(viewButton);

                    return div;
                } },
            ],
            rows: [],
            classTable: 'table table-striped table-hover',
            styleTable: 'width: 100%;',
            styleTD: 'border: 1px solid #ddd;',
        });
        table.render();


        // Prepare agent select
        {
            prepareAgentSelect(response.agents);

            // Listen to agent change
            elements.selects.agent.getElement().addEventListener('change', async () => {
                // Get selected agent
                const selectedAgentId = elements.selects.agent.get_selected_value();

                // If no agent is selected
                if (selectedAgentId == '-1') {
                    // Re-prepare customers select
                    prepareCustomerSelect(_STORAGE.customers);
                    return;
                }
                
                try {
                    // Check if agent customers are already stored - prevent sending another request
                    if (_STORAGE.agentCustomers[selectedAgentId]) {
                        // Re-prepare customers select
                        prepareCustomerSelect(_STORAGE.agentCustomers[selectedAgentId]);
                        return;
                    }

                    loader.show('Getting agent customers...');
                    const response = await http.get(`api/agents/${selectedAgentId}/customers`);
                    loader.hide();
                    
                    if (response.state) {
                        // Store agent customers
                        _STORAGE.agentCustomers[selectedAgentId] = response.data;
                        

                        // Append customers to select
                        const customerSelectOptions = [
                            {'id': '-1', 'name': 'None', 'selected': true},
                            ...response.data
                        ];
                        elements.selects.customer.put_options(customerSelectOptions, 'id', 'name');
                    }
                    else {
                        // Show error
                        loader.error('Failed to get agent customers');
                    }
                }
                catch (error) {
                    console.error('Error fetching agent customers:', error);
                }
            });
        }

        // Prepare customers select
        {
            prepareCustomerSelect(response.customers);
        }

        // Prepare date range picker
        {
            $(elements.inputs.date.getElement()).daterangepicker({
                autoUpdateInput: false,
                opens: 'left',
                locale: {
                    cancelLabel: 'Clear',
                    format: 'YYYY-MM-DD'
                }
            });
            
            $(elements.inputs.date.getElement()).on('apply.daterangepicker', function(ev, picker) {
                elements.inputs.date.valueSet(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
            });

            $(elements.inputs.date.getElement()).on('cancel.daterangepicker', function(ev, picker) {
                elements.inputs.date.valueSet('');
            });
        }

        // Prepare filters
        {
            // By default hide the filter reset button
            elements.buttons.filter.reset.isVisible(false);

            // Listen to filter submit button
            elements.buttons.filter.submit.onClick(async () => {
                // Get selected filters
                
                const selectedFilters = {
                    agent: elements.selects.agent.get_selected_value(),
                    customer: elements.selects.customer.get_selected_value(),
                    date: elements.inputs.date.valueGet(),
                };

                // Check if all filters are empty
                if (areFiltersEmpty()) {
                    loader.error('Please select at least one filter');
                    return;
                }
                
                // Show loader only if we're making the request
                loader.show('Loading data...');

                // Get data from the server
                const response = await http.get('api/calls/by-filters', selectedFilters);
                
                loader.hide();

                // If there is no data
                if (response.length == 0) {
                    loader.error('No data found');
                    return;
                }

                // Show the filter reset button
                elements.buttons.filter.reset.isVisible(true);

                // Prepare table
                table.config.rows = response;
                table.render();
            });

            // Listen to filter reset button
            elements.buttons.filter.reset.onClick(() => {
                elements.inputs.date.valueSet(null);
                elements.selects.agent.set_selected_option_by_value('-1');
                elements.selects.customer.set_selected_option_by_value('-1');
                elements.buttons.filter.reset.isVisible(false);
            });
        }

        loader.hide();
        loader.toast('Data loaded successfully');

        // Emit init event - just for testing
        EventBusInstance.emit(events.init.name, 'hello :)');
    }
    catch (error) {
        loader.hide();
        loader.error('Failed to load data');
        console.error('Error:', error);
    }
}


const areFiltersEmpty = () => {
    return elements.selects.agent.get_selected_value() == '-1' && elements.selects.customer.get_selected_value() == '-1' && !elements.inputs.date.valueGet();
}


/**
 * Prepare agent select
 * @param {array} _agents 
 */
const prepareAgentSelect = (_agents) => {
    const agentSelectOptions = [
        {'id': '-1', 'name': 'None', 'selected': true},
        ..._agents
    ];
    elements.selects.agent.put_options(agentSelectOptions, 'id', 'name');
}

/**
 * Prepare customer select
 * @param {array} _customers 
 */
const prepareCustomerSelect = (_customers) => {
    const customerSelectOptions = [
        {'id': '-1', 'name': 'None', 'selected': true},
        ..._customers
    ];
    elements.selects.customer.put_options(customerSelectOptions, 'id', 'name');
}