
# customers Table

This table contains all customers.

### Columns:
- id: `A_I` `mediumint` `unsigned`
    - `mediumint`: enough for this table (usually the number of customers is more than the number of agents)
    - `unsigned`: to prevent negative values
- name: `varchar(50)`
