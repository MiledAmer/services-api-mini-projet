@echo off

echo Starting all microservices...

start "catalog-service" cmd /k "nest start catalog-service"
start "order-service" cmd /k "nest start order-service"
start "stock-service" cmd /k "nest start stock-service"
start "notification-service" cmd /k "nest start notification-service"
start "query-service" cmd /k "nest start query-service"
start "api-gateway" cmd /k "nest start api-gateway"

echo All services started.
pause