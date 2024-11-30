
# Calls Controller

This controller is used to get related data for the calls page

- related file: `app\Http\Controllers\CallsController.php`

---

## Methods

### index

This is used to get the related data when opening the welcome page

When opening the welcome page, We need to get agents and customers in order to put them into the select elements.

So, Instead of sending 2 requests, We can send one request to get the related data and prevent multiple requests.

### indexByFilters

This is used to get the search results for the normal table

### indexDataTables

This is used to get the search results for the DataTables table