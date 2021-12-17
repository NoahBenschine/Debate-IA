const {Pool} = require("pg");


if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    });
} else {
// if on local
    pool = new Pool({
        user: process.env.D_user,
        password: process.env.D_password,
        port: process.env.D_pport,
        host: process.env.D_host,
        database: process.env.D_database
    });
}

const client = await db.connect();
          const result = await client.query('SELECT * FROM TABLE_NAME');
          res.send(result);
          client.release();
