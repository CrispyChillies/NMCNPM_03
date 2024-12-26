import sql from "mssql2";

const config = {
  user: "sa",
  password: "1StrongPwd!!",
  server: "localhost",
  port: 1433,
  database: "gamemarket",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

export const connectDB = async () => {
  try {
    if (pool) {
      return pool;
    }

    pool = await sql.connect(config);
    console.log("Connected to the database successfully");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

// Optional: Handle cleanup on application shutdown
process.on("SIGINT", async () => {
  if (pool) {
    await pool.close();
    pool = null;
  }
  process.exit(0);
});

export async function queryDemo() {
  try {
    const result = await sql.query`SELECT TOP 10 * FROM Account`;
    console.log("Query results:", result);
  } catch (err) {
    console.error("Query failed: ", err);
  }
}
