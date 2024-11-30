<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentCustomers extends Model
{
    protected $table = 'agent_customers';
    protected $fillable = ['agent_id', 'customer_id'];
}
