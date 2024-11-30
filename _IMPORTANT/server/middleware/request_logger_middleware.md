
# Request Logger Middleware Documentation

The Request Logger Middleware is a Laravel middleware component that logs incoming HTTP requests and their responses. It provides detailed logging capabilities for monitoring and debugging API interactions.


## Features
- Logs request method, URL, and headers
- Captures request payload (body)
- Records response status code and content
- Tracks request processing time
- Supports selective logging based on configuration
- Handles different content types appropriately

---

## Usage

### Registration
Register the logger channel in `config/logging.php`:
```php
'channels' => [
    'request_logger' => [
        'driver' => 'single',
        'path' => storage_path('logs/requests.log'),
        'level' => env('LOG_LEVEL', 'debug'),
        'days' => 14,
    ],
],
```

Register the middleware in `bootstrap\app.php`:
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->append(\App\Http\Middleware\GlobalRequestLog::class);
})
```

Modify the logger configuration in `config\request-logger.php`:
```php
return [
    // Master switch to enable/disable all request logging
    'enabled' => env('REQUEST_LOGGER_ENABLED', true),

    // ... other configuration options
```

Relevant files:
- `bootstrap/app.php`
- `app\Http\Middleware\GlobalRequestLog.php`
- `config\request-logger.php`


### Log Format
```plaintext
[2024-11-30 11:21:47] local.INFO: 🔵 REQUEST {"timestamp":"2024-11-30 11:21:47.013243","method":"GET","url":"http://localhost/laravel_project/public/api/agents/1/customers","ip":"::1","user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36","input":[],"headers":{"host":["localhost"],"connection":["keep-alive"],"pragma":["no-cache"],"cache-control":["no-cache"],"sec-ch-ua-platform":["\"Windows\""],"x-csrf-token":["undefined"],"user-agent":["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"],"sec-ch-ua":["\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\""],"content-type":["application/json"],"sec-ch-ua-mobile":["?0"],"accept":["*/*"],"sec-fetch-site":["same-origin"],"sec-fetch-mode":["cors"],"sec-fetch-dest":["empty"],"referer":["http://localhost/laravel_project/public/"],"accept-encoding":["gzip, deflate, br, zstd"],"accept-language":["en-GB,en-US;q=0.9,en;q=0.8,he;q=0.7"],"cookie":["Phpstorm-910ac9fd=a6c795f8-1910-4b25-b57d-ee345755b7f7; XSRF-TOKEN=eyJpdiI6InhtWWV2QXlJM0FwRHVPWk83MDBYblE9PSIsInZhbHVlIjoiZlBJVU1yWEZNV0hkTFpWQ05MRnE2MnFLZlJ0Z0dxRE10a1JSenN4L1JNMzN2OHh1RHlFQjRsbWVtVnBTV09mZWR4ZkdJRXB2TE5Tay9DWkVSNVJyaXpzVlZOcmgzZk1ielp3UDJ6eHpuSFNJa2NldTVCN3JyVXZTbEhNT0R2Z2YiLCJtYWMiOiJmOGMwYjE2Yzc4YTk5MzViZjkxMmIzM2ViMzU3Yjc3ZWE0NDZlNWMzMjRjMjYzNjcwYjdhY2IwMGQ0MzNmOWZkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InNvYWd4eVkwVFRkQXJXYURsOFc3Unc9PSIsInZhbHVlIjoieGM2aUlCNXRsZG1CUThlZEhxUjRhRWE3ZGxSMVVGYzF4K0JIWEMwMmdnc3ZzVkw0YitVV2lFNkFWQi9KUHVLeEgyMEdxTlZhbnEzMkFSV2w1NnVJTGJJQkQxVXp4bnhrTWZEamttaGpSMEZ4Q2l2UXRyeUhlOThybnF0UXQ2N3kiLCJtYWMiOiJjODgzYjMzZDY2NzE2YzhlMGQ5YTNiZjRhOGY0ODZmOThmYmU1OTllMzBmNGFkZThkYzYwZTRmOTZkZGFiYWE0IiwidGFnIjoiIn0%3D"]}} 
[2024-11-30 11:21:47] local.INFO: 🟢 RESPONSE {"timestamp":"2024-11-30 11:21:47.041947","duration":"29.89ms","status":200,"content":{"state":true,"data":[{"id":1,"name":"John Smith"}]}} 
```