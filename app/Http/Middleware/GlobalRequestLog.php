<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;

class GlobalRequestLog
{
    public function handle(Request $request, Closure $next): Response
    {
        // Skip logging if disabled in config
        if (!Config::get('request-logger.enabled', false)) {
            return $next($request);
        }

        $startTime = microtime(true);
        $config = Config::get('request-logger.log_options', []);

        // Get the logger instance
        $logger = Log::channel('request_logger');

        // Log the incoming request if enabled
        if ($config['request']['enabled'] ?? true) {
            $requestData = [];
            
            if ($config['request']['timestamp'] ?? true) {
                $requestData['timestamp'] = now()->format('Y-m-d H:i:s.u');
            }
            if ($config['request']['method'] ?? true) {
                $requestData['method'] = $request->method();
            }
            if ($config['request']['url'] ?? true) {
                $requestData['url'] = $request->fullUrl();
            }
            if ($config['request']['ip'] ?? true) {
                $requestData['ip'] = $request->ip();
            }
            if ($config['request']['user_agent'] ?? true) {
                $requestData['user_agent'] = $request->userAgent();
            }
            if ($config['request']['input'] ?? true) {
                $requestData['input'] = $request->all();
            }
            if ($config['request']['headers'] ?? true) {
                $requestData['headers'] = $request->headers->all();
            }

            $logger->info('🔵 REQUEST', $requestData);
        }

        // Process the request
        $response = $next($request);

        // Log the response if enabled
        if ($config['response']['enabled'] ?? true) {
            $responseData = [];
            
            if ($config['response']['timestamp'] ?? true) {
                $responseData['timestamp'] = now()->format('Y-m-d H:i:s.u');
            }
            if ($config['response']['duration'] ?? true) {
                $responseData['duration'] = round((microtime(true) - $startTime) * 1000, 2) . 'ms';
            }
            if ($config['response']['status'] ?? true) {
                $responseData['status'] = $response->status();
            }
            
            if ($config['response']['content'] ?? true) {
                // Get response content based on type
                $content = null;
                if ($response->headers->get('Content-Type') === 'application/json') {
                    $content = json_decode($response->getContent(), true);
                }
                else {
                    // For non-JSON responses, try to extract JSON from the content
                    $responseContent = $response->getContent();
                    if (preg_match('/\{.*\}/s', $responseContent, $matches)) {
                        $possibleJson = $matches[0];
                        $decodedJson = json_decode($possibleJson, true);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            $content = $decodedJson;
                        }
                    }
                }
                $responseData['content'] = $content;
            }

            $logger->info('🟢 RESPONSE', $responseData);
        }

        return $response;
    }
}
