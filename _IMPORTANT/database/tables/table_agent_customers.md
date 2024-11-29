
# agent_customers Table

This table contains all agent customers.

### Columns:
- id: `A_I` `int` `unsigned`
  - `int`: since agent can have multiple customers, we need a bigger column type
  - `unsigned`: to prevent negative values
- agent_id: `smallint` `unsigned`
  - `smallint`: to match the `id` column of the `agents` table
  - `unsigned`: to prevent negative values
- customer_id: `mediumint` `unsigned`
  - `mediumint`: to match the `id` column of the `customers` table
  - `unsigned`: to prevent negative values

### Foreign Keys:
- agent_id: freign key to agents table
- customer_id: foreign key to customers table
