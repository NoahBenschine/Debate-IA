const { Client } = require('pg');

const client = new Client({
    connectionString: DATABASE_URL ,
    ssl: true
})
console.log(client)
client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
