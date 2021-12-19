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

function sideInsert(){
  const text = 'INSERT INTO sides(topic_id,owner_id,debate_id,side) VALUES($1,$2) RETURNING *'
  const values = [tname,date()]
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}

function debateInsert(tname){
  const text = 'INSERT INTO debate(topic_name,date) VALUES($1,$2) RETURNING *'
  const values = {}
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}

function voteInsert(){
  const text = 'INSERT INTO vote(topic_id,owner_id,debate_id) VALUES($1,$2) RETURNING *'
  const values = []
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}

function topicInsert(){
  const text = 'INSERT INTO topic(name,owner_id) VALUES($1,$2) RETURNING *'
  const values = []
  pool.query(text,values, (err, res) => {
console.log(err, res)
pool.end()
})
}
