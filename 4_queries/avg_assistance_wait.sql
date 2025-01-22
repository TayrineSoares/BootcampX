-- Calculate the average time it takes to start an assistance request.
-- Return just a single column here.

SELECT 
    AVG(created_at - started_at) AS average_wait_time
FROM assistance_requests;