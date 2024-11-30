<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Request Logger Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration for the request logger middleware.
    | You can enable/disable different aspects of logging here.
    |
    */

    // Master switch to enable/disable all request logging
    'enabled' => env('REQUEST_LOGGER_ENABLED', true),

    // Log channel to use
    'log_channel' => 'request_logger',

    // Configure what to log
    'log_options' => [
        'request' => [
            'enabled' => true,
            'headers' => true,
            'input' => true,
            'method' => true,
            'url' => true,
            'ip' => true,
            'user_agent' => true,
        ],
        'response' => [
            'enabled' => true,
            'status' => true,
            'content' => true,
            'duration' => true,
        ]
    ],
];
