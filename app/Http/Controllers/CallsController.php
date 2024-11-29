<?php

namespace App\Http\Controllers;

use App\Http\Controllers\CustomersController;
use App\Http\Controllers\AgentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CallsController extends Controller
{
    protected $customersController;
    protected $agentsController;

    public function __construct(CustomersController $customersController, AgentsController $agentsController)
    {
        $this->customersController = $customersController;
        $this->agentsController = $agentsController;
    }

    public function index()
    {
        // Get data from both controllers
        $customers = $this->customersController->index()->getData();
        $agents = $this->agentsController->index()->getData();

        // Combine the data
        $combinedData = [
            'customers' => $customers->data,
            'agents' => $agents->data
        ];

        return response()->json($combinedData);
    }

    public function indexByFilters(Request $request)
    {
        $query = DB::table('calls')
            ->join('customers', 'calls.customer_id', '=', 'customers.id')
            ->join('agents', 'calls.agent_id', '=', 'agents.id')
            ->select('calls.*', 'customers.name as customer_name', 'agents.name as agent_name');

        // Filter by agent if provided
        if ($request->has('agent') && isset($request->agent) && $request->agent !== '' && $request->agent !== '-1') {
            $query->where('calls.agent_id', $request->agent);
        }

        // Filter by customer if provided
        if ($request->has('customer') && isset($request->customer) && $request->customer !== '' && $request->customer !== '-1') {
            $query->where('calls.customer_id', $request->customer);
        }

        // Filter by date if provided
        if ($request->has('date') && isset($request->date) && $request->date !== '') {
            // Check if date contains two dates
            if (strpos($request->date, ' - ') !== false) {
                $dates = explode(' - ', $request->date);
                $query->whereBetween('calls.date', [$dates[0], $dates[1]]);
            }
            else {
                $query->where('calls.date', $request->date);
            }

        }

        // Debug final SQL query
        // Log::info('SQL Query:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);
        
        $calls = $query->get();
        // Log::info('Results count:', ['count' => $calls->count()]);

        return response()->json($calls);
    }
}
