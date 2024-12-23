import sql from 'mssql';

const config = {
  user: 'sa',
  password: '1StrongPwd!!',
  server: 'localhost',
  port: 1433,
  database: 'gamemarket',
  options: {
    encrypt: true,
    trustServerCertificate: true 
  }
};

let globalPool = null;

export async function connectDB() {
  try {
    if (!globalPool) {
      globalPool = await sql.connect(config);
      console.log('Connected to the database successfully');
    }
    return globalPool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
}