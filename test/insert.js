const debate = require("../src/debate.js");
const user = require("../src/user.js");
const Topic = require("../src/topic.js");
const side = require("../src/side.js");
const vote = require("../src/vote.js");

var fnName = async function() {
  const user_id = await user("Noah Benschine");
  debate.debateInsert("Death Penalty");
  const debate_id = await debate.getDebate();
  Topic.topicInsert("Death Penalty",user_id)
const topic_id = await Topic.getTopic("Death Penalty");
  side.sideInsert(topic_id,user_id,debate_id,"Pro");
  vote.voteInsert(topic_id,user_id,debate_id);

}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}
