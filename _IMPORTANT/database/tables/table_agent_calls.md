
# agent_calls Table

!!! TO_REMOVE !!!

This table contains all agent calls.

### Columns:
- id: `A_I` `mediumint` `unsigned`
  - `mediumint`: enough for this table
  - `unsigned`: to prevent negative values
- agent_id: `smallint` `unsigned`
  - `smallint`: to match the `id` column of the `agents` table
  - `unsigned`: to prevent negative values
- call_id: `mediumint` `unsigned`
  - `mediumint`: to match the `id` column of the `calls` table
  - `unsigned`: to prevent negative values

### Foreign Keys:
- agent_id: foreign key to agents table
- call_id: foreign key to calls table
