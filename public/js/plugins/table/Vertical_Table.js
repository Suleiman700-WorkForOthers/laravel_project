import Table from "./Table.js";
import EventEmitter from 'events';

export default class Vertical_Table extends EventEmitter {
    constructor(_parent, _config) {
        super();
        this.parent = document.querySelector(_parent);

        // Check if parent exists
        if (!this.parent) {
            console.error(`[Vertical_Table] Parent #${_parent} does not exist`);
            return;
        }

        this.config = {
            tbody: _config.tbody,
            rows: _config.rows,
            custom: _config.custom,
            classTable: _config?.classTable || '',
            styleTable: _config?.styleTable || '',
            styleTD: _config?.styleTD || '',
            pagination: {
                enabled: _config.pagination?.enabled ?? true,
                rowsPerPage: _config.pagination?.rowsPerPage ?? 10,
                currentPage: 1,
                totalRows: 0
            }
        };

        this.init();
    }

    init() {
        // Create table structure
        this.create_table_structure();
        
        // Create pagination if enabled
        if (this.config.pagination.enabled) {
            this.create_pagination();
        }
    }

    create_table_structure() {
        this.table = document.createElement('table');
        this.table.className = this.config.classTable;
        this.table.style = this.config.styleTable;
        this.parent.appendChild(this.table);

        // Create table head
        this.thead = document.createElement('thead');
        this.table.appendChild(this.thead);

        // Create table body
        this.tbody = document.createElement('tbody');
        this.table.appendChild(this.tbody);
    }

    create_pagination() {
        this.pagination_container = document.createElement('div');
        this.pagination_container.className = 'pagination-container mt-3 d-flex justify-content-between align-items-center';
        
        // Rows per page selector
        const rowsPerPageContainer = document.createElement('div');
        rowsPerPageContainer.className = 'rows-per-page';
        rowsPerPageContainer.innerHTML = `
            <span>Rows per page:</span>
            <select class="form-select form-select-sm d-inline-block w-auto ms-2">
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        `;

        // Pagination info
        this.pagination_info = document.createElement('div');
        this.pagination_info.className = 'pagination-info';

        // Pagination controls
        this.pagination_controls = document.createElement('div');
        this.pagination_controls.className = 'pagination-controls';
        this.pagination_controls.innerHTML = `
            <button class="btn btn-sm btn-outline-secondary me-2" data-action="prev">Previous</button>
            <button class="btn btn-sm btn-outline-secondary" data-action="next">Next</button>
        `;

        // Add event listeners
        rowsPerPageContainer.querySelector('select').addEventListener('change', (e) => {
            this.config.pagination.rowsPerPage = parseInt(e.target.value);
            this.config.pagination.currentPage = 1;
            this.emit('pagination-change', {
                page: this.config.pagination.currentPage,
                rowsPerPage: this.config.pagination.rowsPerPage
            });
        });

        this.pagination_controls.querySelector('[data-action="prev"]').addEventListener('click', () => {
            if (this.config.pagination.currentPage > 1) {
                this.config.pagination.currentPage--;
                this.emit('pagination-change', {
                    page: this.config.pagination.currentPage,
                    rowsPerPage: this.config.pagination.rowsPerPage
                });
            }
        });

        this.pagination_controls.querySelector('[data-action="next"]').addEventListener('click', () => {
            const maxPages = Math.ceil(this.config.pagination.totalRows / this.config.pagination.rowsPerPage);
            if (this.config.pagination.currentPage < maxPages) {
                this.config.pagination.currentPage++;
                this.emit('pagination-change', {
                    page: this.config.pagination.currentPage,
                    rowsPerPage: this.config.pagination.rowsPerPage
                });
            }
        });

        // Append all elements
        this.pagination_container.appendChild(rowsPerPageContainer);
        this.pagination_container.appendChild(this.pagination_info);
        this.pagination_container.appendChild(this.pagination_controls);
        this.parent.appendChild(this.pagination_container);
    }

    update_pagination_info() {
        if (!this.config.pagination.enabled) return;

        const start = (this.config.pagination.currentPage - 1) * this.config.pagination.rowsPerPage + 1;
        const end = Math.min(start + this.config.pagination.rowsPerPage - 1, this.config.pagination.totalRows);
        const total = this.config.pagination.totalRows;

        this.pagination_info.textContent = `Showing ${start}-${end} of ${total}`;

        // Update button states
        const prevButton = this.pagination_controls.querySelector('[data-action="prev"]');
        const nextButton = this.pagination_controls.querySelector('[data-action="next"]');

        prevButton.disabled = this.config.pagination.currentPage === 1;
        nextButton.disabled = end >= total;
    }

    set_total_rows(total) {
        this.config.pagination.totalRows = total;
        this.update_pagination_info();
    }

    clear_tbody() {
        this.tbody.innerHTML = '';
    }

    add_row(_data) {
        const tr = document.createElement('tr');
        this.config.tbody.forEach(column => {
            const td = document.createElement("td");
            td.style = this.config.styleTD;

            switch (column.method) {
                case "text":
                    td.innerHTML = _data[column.key];
                    break;
                case "function":
                    const result = column.callback(_data, column);
                    if (result instanceof Node) {
                        td.appendChild(result);
                    } else {
                        td.innerHTML = result;
                    }
                    break;
            }

            tr.appendChild(td);
        });
        this.tbody.appendChild(tr);
    }

    render() {
        super.render();
        this.thead.innerHTML = '';
        this.config.tbody.forEach(thTitle => {
            const th = document.createElement("th");
            th.style = `padding:8px;${this.config.styleTD}`;
            th.innerHTML = thTitle.title;
            this.thead.appendChild(th);
        });

        if (!this.config.rows || this.config.rows.length === 0) {
            this.showNoResults();
            return;
        }

        this.set_total_rows(this.config.rows.length);
        this.clear_tbody();
        const start = (this.config.pagination.currentPage - 1) * this.config.pagination.rowsPerPage;
        const end = Math.min(start + this.config.pagination.rowsPerPage, this.config.rows.length);
        for (let i = start; i < end; i++) {
            this.add_row(this.config.rows[i]);
        }
    }

    showNoResults() {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.style = this.config.styleTD;
        td.colSpan = this.config.tbody.length;
        td.className = "text-center py-4 text-muted";
        td.innerHTML = `
            <div>
                <i class="fas fa-search fa-2x mb-2"></i>
                <p class="mb-0">No data yet</p>
            </div>
        `;
        tr.appendChild(td);
        this.tbody.appendChild(tr);
    }
}