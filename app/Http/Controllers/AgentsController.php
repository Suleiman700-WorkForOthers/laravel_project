<?php

namespace App\Http\Controllers;

use App\Models\Agents;
use App\Models\AgentCustomers;
use Illuminate\Http\Request;

class AgentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $agents = Agents::all();
        return response()->json(['data' => $agents]);
    }

    /**
     * Get all customers for a specific agent
     */
    public function getCustomers($id)
    {
        $customers = \DB::table('customers')
            ->join('agent_customers', 'customers.id', '=', 'agent_customers.customer_id')
            ->where('agent_customers.agent_id', $id)
            ->select('customers.id', 'customers.name')
            ->get();

        return response()->json([
            'state' => $customers ? true : false,
            'data' => $customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
