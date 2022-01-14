const {Pool} = require("pg");
// const date = require("./date.js");



var fnName = function() {
    // main code
    tableGet();

}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}
function tableGet(){
  text = 'SELECT column_name FROM information_schema.columns WHERE table_name = $1;'
  values = ["sides"]
 pool.query(text, values,(err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    pool.end();
  });

}
