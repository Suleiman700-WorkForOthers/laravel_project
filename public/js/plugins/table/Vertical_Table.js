import Table from "./Table.js";

export default class Vertical_Table extends Table {
    constructor(_parent, _config) {
        super();
        this.parent = document.querySelector(_parent);
        this.config = {
            tbody: _config.tbody,
            rows: _config.rows,
            custom: _config.custom,
            classTable: _config?.classTable || '',
            styleTable: _config?.styleTable || '',
            styleTD: _config?.styleTD || '',
        };
        return this;
    }

    render() {
        super.render();
        const table = document.createElement("table");
        table.className = this.config.classTable;
        table.style = this.config.styleTable;
        
        table.appendChild(this.createThead());
        this.createBody(table);

        this.parent.appendChild(table);
    }

    createThead() {
        const tbody = document.createElement("tbody");
        this.config.tbody.forEach(thTitle => {
            const th = document.createElement("th");
            th.style = `padding:8px;${this.config.styleTD}`;
            th.innerHTML = thTitle.title;
            tbody.appendChild(th);
        });
        return tbody;
    }

    createBody(table) {
        if (!this.config.rows || this.config.rows.length === 0) {
            this.showNoResults(table);
            return;
        }

        this.config.rows.forEach(row => {
            const tr = document.createElement("tr");
            this.config.tbody.forEach(column => {
                const td = document.createElement("td");
                td.style = this.config.styleTD;

                switch (column.method) {
                    case "text":
                        td.innerHTML = row[column.key];
                        break;
                    case "function":
                        const result = column.callback(row, column);
                        if (result instanceof Node) {
                            td.appendChild(result);
                        } else {
                            td.innerHTML = result;
                        }
                        break;
                }

                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    showNoResults(table) {
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
        table.appendChild(tr);
    }
}