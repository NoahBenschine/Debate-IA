const {Pool} = require("pg");
const date = require("./date.js");


const DATABASE_URL="postgres://umrmaqjiosxlzz:19003182defd9632bc4ab99e883e17ff03eb9582be42f65c8c53cfff0139b89a@ec2-52-200-188-218.compute-1.amazonaws.com:5432/d1a4rmjasfh6co"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: true,
    });

var fnName = function() {
    // main code
    console.log(date());

}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}

function deleteTopic(topic_name){
  const text = 'DELTE FROM topic where name = [$1] RETURNING *'
  const values = [topic_name]
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}

function changeVote(topic_id){
  const text = 'UPDATE vote SET topic_id = $1 WHERE user_id = $2 RETURNING *'
  const values = [topic_id,user_id]
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}
