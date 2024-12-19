import pyodbc

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost,1433;'
    'DATABASE=master;'
    'UID=sa;'
    'PWD=1StrongPwd!!'
)

const sql = require('mssql');

const config = {
    user: 'sa',
    password: '1StrongPwd!!',
    server: 'localhost',
    database: 'master',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to false for production
    }
};

sql.connect(config).then(pool => {
    // Use the connection pool
}).catch(err => {
    console.error('SQL connection error', err);
});