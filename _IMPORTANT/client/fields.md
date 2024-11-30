
# Fields

This document contains information about the fields used in the project

### Filters

Currently we have the following filters:

- Agent
- Customer
- Date

---

#### Agent filter

In in `init.js`, It fetches the agents from the server and populates the agent select box with the agents.

```javascript
const agentSelectOptions = [
    {'id': '-1', 'name': 'None', 'selected': true}, // Add None option
    ..._agents
];
elements.selects.agent.put_options(agentSelectOptions, 'id', 'name');
```

Also on agent filter change, It gets the selected agent id and gets the agent's customers from the server and populates the customer select box with the customers.

---

#### Customer filter

In in `init.js`, It fetches the customers from the server and populates the customer select box with the customers.

```javascript
const customerSelectOptions = [
    {'id': '-1', 'name': 'None', 'selected': true}, // Add None option
    ..._customers
];
elements.selects.customer.put_options(customerSelectOptions, 'id', 'name');