require('dotenv').config();
const {Pool} = require('pg');

console.log(process.env);
const pool = (() => {
if (process.env.NODE_ENV !== 'production') {
    return new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
} else {
    return new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    });
} })();

pool.connect();

pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pool.end();
});
