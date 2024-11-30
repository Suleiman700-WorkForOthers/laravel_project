
# calls Table

This table contains all calls.

### Columns:
- id: `A_I` `mediumint` `unsigned`
    - `mediumint`: enough for this table
    - `unsigned`: to prevent negative values
- agent_id: `smallint`
  - `smallint`: to match the `id` column of the `agents` table
- customer_id: `mediumint`
  - `mediumint`: to match the `id` column of the `customers` table
- title: `varchar(500)`
- comment: `text`
- duration: `time`
  - `time`: the duration of the call
- date: `date`
  - `date`: the date of the call

Foreign Keys:
- agent_id: foreign key to agents table
- customer_id: foreign key to customers table