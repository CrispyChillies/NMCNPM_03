import sql from 'mssql2';

const config = {
  user: 'sa',
  password: '1StrongPwd!!',
  server: 'localhost',
  port: 1433,
  database: 'master',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true // Change to false if you are using a trusted certificate
  }
};

export async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Connected to the database successfully');
  } catch (err) {
    console.error('Database connection failed: ', err);
  }
}

export async function queryDemo() {
  try {
    const result = await sql.query`SELECT TOP 10 * FROM Account`;
    console.log('Query results:', result);
  } catch (err) {
    console.error('Query failed: ', err);
  }
}