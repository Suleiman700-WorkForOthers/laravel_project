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
import { popup_callDetails, popup_customerDetails } from "../../helpers/popups.js";

const _STORAGE = {
    agents: [],
    customers: [],
    agentCustomers: {}, // { agentId: [customers] }
    customerDetails: {}, // { customerId: {} }
};

const CustomerInstance = new Customers();
const EventBusInstance = new EventBus();

let normalTable = null;
let dataTable = null;

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
                    return;
                }
                
                // Show the filter reset button
                elements.buttons.filter.reset.isVisible(true);

                // Load data into both tables
                dataTable.ajax.reload();
                
                // Get data from the server for vertical table
                loader.show('Loading data...');
                const response = await http.get('api/calls/by-filters', selectedFilters);
                loader.hide();

                if (response.length === 0) {
                    loader.error('No data found');
                    return;
                }

                // Update normal table
                normalTable.config.rows = response;
                normalTable.render();
            });

            // Listen to filter reset button
            elements.buttons.filter.reset.onClick(() => {
                elements.forms.filter.reset();
                elements.selects.agent.reset();
                elements.selects.customer.reset();
                elements.buttons.filter.reset.isVisible(false);
                
                // Clear both tables
                dataTable.clear().draw();
                normalTable.config.rows = [];
                normalTable.render();
            });
        }

        // Prepare normal table
        {
            normalTable = new Vertical_Table('#test-table', {
                tbody: [
                    { key: 'agent_name', title: 'Agent', method: 'text' },
                    {
                        key: 'customer_name',
                        title: 'Customer',
                        method: 'function',
                        callback: (row, column) => {
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
                                const customerDetails = await getCustomerDetails(row.customer_id);
                                popup_customerDetails(customerDetails);
                            });
                            div.appendChild(badge); 
                            return div;
                        }
                    },
                    {
                        key: 'title',
                        title: 'Title',
                        method: 'function',
                        callback: (row, column) => {
                            const title = row[column.key];
                            return title.length > 20 ? `${title.substring(0, 20)}...` : title;
                        }
                    },
                    {
                        key: 'duration',
                        title: 'Duration',
                        method: 'function',
                        callback: (row, column) => callDurationFormatter(row[column.key])
                    },
                    {
                        key: 'date',
                        title: 'Date',
                        method: 'function',
                        callback: (row, column) => {
                            const date = new Date(row[column.key]);
                            return date.toLocaleDateString('en-IL', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        }
                    },
                    {
                        title: 'Actions',
                        method: 'function',
                        callback: (row, column) => {
                            const div = document.createElement('div');
        
                            const viewButton = document.createElement('button');
                            viewButton.className = 'btn btn-sm btn-primary';
                            viewButton.innerHTML = '<i class="fas fa-eye me-1"></i> View';
                            viewButton.setAttribute('data-id', row.id);
                            viewButton.addEventListener('click', () => {
                                popup_callDetails(row);
                            });
                            div.appendChild(viewButton);
        
                            return div;
                        }
                    },
                ],
                rows: [],
                classTable: 'table table-striped table-hover',
                styleTable: 'width: 100%;',
                styleTD: 'border: 1px solid #ddd;',
            });
            normalTable.render();    
        }
        
        // Prepare datatable
        {
            const columns = [
                { 
                    title: 'Agent',
                    data: 'agent_name'
                },
                { 
                    title: 'Customer',
                    data: 'customer_name',
                    render: function(data, type, row) {
                        const customer = row.customer_name;
        
                        const div = document.createElement('div');
                        const span = document.createElement('span');
                        span.textContent = customer;
                        div.appendChild(span);
        
                        const badge = document.createElement('span');
                        badge.className = 'badge bg-success mx-1 customer-info';
                        badge.style.cursor = 'pointer';
                        badge.innerHTML = '<i class="fas fa-eye"></i> Info';
                        badge.setAttribute('data-id', row.customer_id);
                        div.appendChild(badge); 

                        return div.innerHTML;
                    }
                },
                { 
                    title: 'Title',
                    data: 'title',
                    render: function(data, type, row) {
                        return data.length > 20 ? `${data.substring(0, 20)}...` : data;
                    }
                },
                { 
                    title: 'Duration',
                    data: 'duration',
                    render: function(data) {
                        return callDurationFormatter(data);
                    }
                },
                { 
                    title: 'Date',
                    data: 'date',
                    render: function(data) {
                        const date = new Date(data);
                        return date.toLocaleDateString('en-IL', { 
                            year: 'numeric', 
                            month: '2-digit', 
                            day: '2-digit' 
                        });
                    }
                },
                {
                    title: 'Actions',
                    data: null,
                    render: function(data, type, row) {
                        return `
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm btn-primary view-call" data-id="${row.id}">
                                    <i class="fas fa-eye me-1"></i> View
                                </button>
                            </div>
                        `;
                    }
                }
            ];

            // Initialize DataTable headers
            const thead = document.querySelector('#datatables-table thead');
            thead.innerHTML = '<tr>' + columns.map(col => `<th>${col.title}</th>`).join('') + '</tr>';

            dataTable = $('#datatables-table').DataTable({
                serverSide: true,
                processing: true,
                searching: false,
                pageLength: 1,
                lengthMenu: [[1, 5, 10, 25, 50], [1, 5, 10, 25, 50]],
                deferLoading: true, // Prevent initial auto-load
                ajax: {
                    url: 'api/calls/datatables',
                    type: 'GET',
                    data: function(d) {
                        return {
                            ...d,
                            agent: elements.selects.agent.get_selected_value(),
                            customer: elements.selects.customer.get_selected_value(),
                            date: elements.inputs.date.valueGet(),
                            perPage: d.length,
                        };
                    }
                },
                columns: columns,
                dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
                        '<"row"<"col-sm-12"tr>>' +
                        '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
                language: {
                    processing: '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
                    emptyTable: "Use the search form above to find calls"
                },
                drawCallback: function() {
                    // Add click handlers for view buttons after table redraw
                    $('#datatables-table').find('.view-call').on('click', function() {
                        const id = $(this).data('id');
                        const row = dataTable.row($(this).closest('tr')).data();
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
                        });
                    });

                    // Add click handlers for customer info buttons after table redraw
                    $('#datatables-table').find('.customer-info').on('click', async function() {       
                        const id = $(this).data('id');
                        const customerDetails = await getCustomerDetails(id);
                        popup_customerDetails(customerDetails);
                    });
                }
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

/**
 * Get customer details
 * @param {number} _customerId 
 * @returns 
 */
const getCustomerDetails = async (_customerId) => {
    let customerData = {};
        
    // Check if customer details are already stored - prevent sending another request
    if (_STORAGE.customerDetails[_customerId]) {
        customerData = _STORAGE.customerDetails[_customerId];
    }
    else {
        // Get customer details
        loader.show('Loading customer details...');
        const customerDetails = await CustomerInstance.getData(_customerId);
        loader.hide();

        if (!customerDetails.state) {
            loader.error('Failed to get customer details');
            return;
        }

        // Store customer details
        _STORAGE.customerDetails[_customerId] = customerDetails.data;
        customerData = customerDetails.data;
    }

    return customerData;
}