FROM mcr.microsoft.com/mssql/server:2022-latest

# Set environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

# Copy the SQL script to the container
COPY game_market.sql /usr/src/app/game_market.sql

# Set the working directory
WORKDIR /usr/src/app

# Run the SQL Server and execute the script
USER root
CMD /bin/bash -c "/opt/mssql/bin/sqlservr & sleep 10s && until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -i game_market.sql; do echo 'Waiting for SQL Server to be ready...'; sleep 5; done && tail -f /dev/null"