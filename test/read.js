const debate = require("../src/debate.js");
const user = require("../src/user.js");
const Topic = require("../src/topic.js");
const side = require("../src/side.js");
const vote = require("../src/vote.js");

var fnName = async function() {
  const user_id = await user("Noah Benschine");
  const debate_id = await debate.getDebate();
const topic_id = await Topic.getTopic("Death Penalty");
const side_obj = await side.getSide(debate_id);
const vote_obj = await vote.getVote(topic_id.id);
console.log("User_id:"+user_id+" DebateId:"+debate_id+"topic_id"+topic_id)
console.log("Side Object:"+JSON.stringify(side_obj))
console.log("Vote Object:"+JSON.stringify(vote_obj))
}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}
