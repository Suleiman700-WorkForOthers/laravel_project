# Client-Side Table Implementations

## Overview
The application implements two distinct table approaches for displaying call records:
1. Dynamic Table (DataTables)
2. Normal Table (Custom Implementation)

Each implementation serves different purposes and offers unique features.

## 1. Dynamic Table (DataTables)

### Features
- Server-side processing
- Built-in pagination
- Dynamic sorting
- Flexible page length options
- Automatic column width adjustment
- Built-in search functionality
- Responsive design

### Implementation Details
```javascript
const dataTable = $('#datatables-table').DataTable({
    serverSide: true,
    processing: true,
    searching: false,
    pageLength: 1,
    lengthMenu: [[1, 5, 10, 25, 50], [1, 5, 10, 25, 50]],
    deferLoading: true
});
```

### Endpoints
- Primary: `/api/calls/datatables`
- Parameters:
  * `agent`: Filter by agent ID
  * `customer`: Filter by customer ID
  * `date`: Filter by date/date range
  * `perPage`: Records per page

### Column Configuration
1. Agent Name
2. Customer Name (with info popup)
3. Call Title
4. Duration
5. Date
6. Actions

## 2. Normal Table (Custom Implementation - my own implementation)

### Features
- Fully customizable layout
- Custom cell rendering
- Event-driven updates
- Lightweight implementation
- Flexible styling options

### Implementation Details
```html
<!-- index.html -->
<!doctype html>
<html lang="en">
<head>
</head>
<body>
    <table id="test-table"></table>
</body>
</html>
```

```javascript
// index.js
const normalTable = new Vertical_Table('#test-table', {
    tbody: [
        { key: 'id', title: 'ID', method: 'text' },
        { key: 'name', title: 'Name', method: 'text' },
        { key: 'email', title: 'Email', method: 'text' },
        { key: 'mobile', title: 'Mobile', method: 'text' },
        { key: 'address', title: 'Address', method: 'text' },
        {
            key: 'actions',
            title: 'Actions',
            method: 'function',
            callback: (row, column) => {
                const actionDiv = document.createElement('div');
                const viewButton = document.createElement('button');
                viewButton.className = 'btn btn-sm btn-primary';
                viewButton.textContent = 'Info';

                viewButton.addEventListener('click', async () => {
                    alert('Info button clicked');
                });

                actionDiv.appendChild(viewButton);
                return actionDiv;
            }
        },
    ],
    rows: [
        { id: 1, name: 'John Smith', email: 'john-smith@gmail.com', mobile: '0521230000', address: 'Tel-Aviv, Isrea' },
        { id: 2, name: 'Tony', email: 'tony-hawk@hotmail.com', mobile: '054001234', address: 'Haifa, Isreal' },
    ],
    classTable: 'table table-striped table-hover',
    styleTable: 'width: 100%;',
    styleTD: 'border: 1px solid #ddd;',
});
normalTable.render();
```

---

## Performance Considerations

### DataTables
- Server-side processing reduces client load
- Deferred loading prevents unnecessary requests
- Optimized for large datasets

### Normal Table
- Lighter initial payload
- No external dependencies
- Better for smaller datasets