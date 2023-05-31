const { Connection } = require("./connection.js");
const helper = require("../components/helper");

const setUserFeed = async (data) => {
  let userId = global.userId;
  let role = global.role;
  let userName = data.name;
  let text = data.text;
  let comments = [];
  let feedId = helper.createUUID(10);
  let getCurrentDateTime = helper.getCurrentDateTime();

  const collection = Connection.conn.db("test").collection("feeds");
  try {
    const dbResponse = await collection.insertOne({
      feedId: feedId,
      userId: userId,
      userName: userName,
      text: text,
      createdAt: getCurrentDateTime,
      comments: comments,
      postBy: role,
    });
    if (dbResponse.acknowledged) {
      return { success: true, data: "posted successfully" };
    }
    return { success: false, message: "plz try again.." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getfeeds = async () => {
  const collection = Connection.conn.db("test").collection("feeds");
  try {
    const dbResponse = await collection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    console.log("---------", dbResponse);
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const addCommentFeed = async (data) => {
  let name = data.name;
  let feedId = data.feedId;
  let text = data.text;
  let userId = global.userId;
  let getCurrentDateTime = helper.getCurrentDateTime();

  const collection = Connection.conn.db("test").collection("feeds");
  try {
    const dbResponse = await collection.updateOne(
      {
        feedId: feedId,
      },
      {
        $push: {
          comments: {
            user_id: userId,
            comment_time: getCurrentDateTime,
            name: name,
            comment_msg: text,
          },
        },
      }
    );
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
module.exports = { setUserFeed, getfeeds, addCommentFeed };
