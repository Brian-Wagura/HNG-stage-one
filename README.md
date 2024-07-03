# HNG

## Stage 1 task.

A basic webserver that expose an API endpoint that conforms to the criteria below:

Endpoint: `[GET] <example.com>/api/hello?visitor_name="Mark" (where <example.com> is your server origin)`

Response: 
```
{
  "client_ip": "127.0.0.1", // The IP address of the requester
  "location": "New York" // The city of the requester
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
}
```