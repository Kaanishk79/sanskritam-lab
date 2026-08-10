SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'sanskritlab';
DROP DATABASE IF EXISTS sanskritlab;
CREATE DATABASE sanskritlab WITH ENCODING 'UTF8' TEMPLATE template1;
