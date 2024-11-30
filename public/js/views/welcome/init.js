import elements from "./elements.js";

import Vertical_Table from "../../plugins/table/Vertical_Table.js";

// ====================== [ Helpers ] ======================
import { loader } from "../../helpers/loader.js";
import { http } from "../../helpers/http.js";
import { callDurationFormatter } from "../../helpers/text_formatter.js";

window.addEventListener('load', async () => {
    await init();
});

const init = async () => {
    try {
        loader.show('Loading data...');

        // Get related data from the server - one request to prevent multiple requests
        const response = await http.get('api/calls');

        // Prepare table
        const table = new Vertical_Table('#test-table', {
            tbody: [
                { key: 'agent_name', title: 'Agent', method: 'text' },
                { key: 'customer_name', title: 'Customer', method: 'text' },
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
            const agentSelectOptions = [
                {'id': '-1', 'name': 'None', 'selected': true},
                ...response.agents
            ];
            elements.selects.agent.put_options(agentSelectOptions, 'id', 'name');

            elements.selects.agent.getElement().addEventListener('change', () => {
                // Get selected agent
                const selectedAgent = elements.selects.agent.get_selected_value();

                // Get customers for the selected agent from the server
                http.get('api/customers/by-agent', { agent_id: selectedAgent }).then(response => {
                    const customerSelectOptions = [
                        {'id': '-1', 'name': 'None', 'selected': true},
                        ...response
                    ];
                    elements.selects.customer.put_options(customerSelectOptions, 'id', 'name');
                });
                
            });
        }

        // Prepare customers select
        {
            const customerSelectOptions = [
                {'id': '-1', 'name': 'None', 'selected': true},
                ...response.customers
            ];
            elements.selects.customer.put_options(customerSelectOptions, 'id', 'name');
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
                // table.config.rows = response.calls;
                // table.render();
            });
        }

        console.log('Full response:', response);

        // Process the data here
        console.log('Customers:', response.customers);
        console.log('Agents:', response.agents);

        loader.hide();
        loader.toast('Data loaded successfully');
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