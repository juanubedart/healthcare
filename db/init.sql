-- CREATE DATABASE IF NOT EXIST
SELECT 'CREATE DATABASE healthcare'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'healthcare')\gexec