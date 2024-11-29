<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/customers', [App\Http\Controllers\CustomersController::class, 'index']);
Route::get('/agents', [App\Http\Controllers\AgentsController::class, 'index']);
Route::get('/calls', [App\Http\Controllers\CallsController::class, 'index']);
Route::get('/calls/by-filters', [App\Http\Controllers\CallsController::class, 'indexByFilters']);
