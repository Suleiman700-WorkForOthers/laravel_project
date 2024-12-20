<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    /**
     * Get listing of the resource.
     */
    public function index()
    {
        $customers = Customers::all();
        return response()->json(['data' => $customers]);
    }

    /**
     * Get the specified resource.
     */
    public function show($id)
    {
        $customer = Customers::find($id);
        return response()->json([
            'state' => $customer ? true : false,
            'data' => $customer
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
