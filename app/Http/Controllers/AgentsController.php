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

    /**
     * Get customers for a specific agent
     */
    public function getCustomersByAgent($agentId)
    {
        $customerIds = AgentCustomers::where('agent_id', $agentId)
            ->pluck('customer_id')
            ->toArray();

        return response()->json([
            'success' => true,
            'data' => $customerIds
        ]);
    }
}
