const {Pool} = require("pg");


const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

    pool.query('SELECT * from sides', (err, res) => {
  console.log(err, res)
  pool.end()
})
//
// pool
//   .connect()
//   .then(client => {
//     return client
//       .query('SELECT * FROM users WHERE id = $1', [1])
//       .then(res => {
//         client.release()
//         console.log(res.rows[0])
//       })
//       .catch(err => {
//         client.release()
//         console.log(err.stack)
//       })
//   })
