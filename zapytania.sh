curl -X POST http://localhost:3000/echo -H "Content-Type: application/json" -d '{"bleh":123}'
curl -X POST http://localhost:3000/echo -H "Content-Type: application/x-www-form-urlencoded" -d 'bleh=123'
