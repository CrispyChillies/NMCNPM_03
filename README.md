# NMCNPM_03
An e-commerce website for selling video games 

# Database initialization
cd database
docker build -t sql_server_image .
docker run -d --name sqlsv -p 1433:1433 -v $(pwd)/data:/var/opt/mssql/data sql_server_image