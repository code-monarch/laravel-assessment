<?php

use App\Http\Controllers\Api\V1\AccessibilityController;
use Illuminate\Support\Facades\Route;

// Define API route for the analyze endpoint
Route::prefix('v1')->group(function () {
    Route::post('/analyze', [AccessibilityController::class, 'analyze']);
});
