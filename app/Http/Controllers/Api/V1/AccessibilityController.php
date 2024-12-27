<?php

 namespace App\Http\Controllers\Api\V1;

use App\Services\AccessibilityAnalyzer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AccessibilityController extends Controller
{
    public function analyze(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:html,htm' // Allow only HTML files
        ]);

        $content = file_get_contents($request->file('file')->path());
        $analyzer = new AccessibilityAnalyzer($content);
        
        return response()->json([
            'score' => $analyzer->calculateScore(),
            'issues' => $analyzer->getIssues()
        ]);
    }
}