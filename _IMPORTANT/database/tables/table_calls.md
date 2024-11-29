
# calls Table

This table contains all calls.

### Columns:
- id: `A_I` `mediumint` `unsigned`
    - `mediumint`: enough for this table
    - `unsigned`: to prevent negative values
- customer_id: `mediumint`
  - `mediumint`: to match the `id` column of the `customers` table
- duration: `time`
  - `time`: the duration of the call
- date: `date`
  - `date`: the date of the call

Foreign Keys:
- customer_id: foreign key to customers table