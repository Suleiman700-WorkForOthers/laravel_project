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

    /**
     * Get all related data
     * 
     * This is used to get the related data when opening the welcome page
     */
    public function index()
    {
        $agents = json_decode(json_encode($this->agentsController->index()->getData()), true);
        $customers = json_decode(json_encode($this->customersController->index()->getData()), true);

        $combinedData = [
            'customers' => $customers['data'],
            'agents' => $agents['data'],
            
            // We can also get the agents' customers, This is not ideally for the performance
            // 'agents' => array_map(function($agent) {
                // $customerIds = $this->agentsController->getCustomersByAgent($agent['id'])->getData()->data;
                // return array_merge($agent, ['customers' => $customerIds]);
            // }, $agents['data'])
        ];

        return response()->json($combinedData);
    }

    /**
     * Index data by filters
     * 
     * This is used to get the data for the normal table
     */
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

    /**
     * Index data for DataTables
     * 
     * This is used to get the data for the DataTables component.
     */
    public function indexDataTables(Request $request)
    {
        $query = DB::table('calls')
            ->join('agents', 'calls.agent_id', '=', 'agents.id')
            ->join('customers', 'calls.customer_id', '=', 'customers.id')
            ->select('calls.*', 'agents.name as agent_name', 'customers.name as customer_name');

        // Apply filters if they exist
        if ($request->filled('agent') && $request->agent !== '-1') {
            $query->where('calls.agent_id', $request->agent);
        }
        if ($request->filled('customer') && $request->customer !== '-1') {
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

        $recordsTotal = $query->count();
        $recordsFiltered = $recordsTotal;

        // Apply pagination
        $start = $request->input('start', 0);
        $length = $request->input('length', ($request->has('perPage') ? $request->perPage : 10));
        
        $data = $query->skip($start)->take($length)->get();

        return response()->json([
            'draw' => $request->input('draw'),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $data
        ]);
    }
}
