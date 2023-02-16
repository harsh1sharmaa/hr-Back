const { Connection } = require("./connection.js");
const helper = require("../components/helper");

const saveLeave = async (data) => {
  let userId = global.userId;
  let to = data.to;
  let from = data.from;
  let reason = data.reason;
  let leaveId = helper.createUUID(10);

  const collection = Connection.conn.db("test").collection("leaves");
  try {
    const dbResponse = await collection.insertOne({
      leaveId: leaveId,
      userId: userId,
      to: to,
      from: from,
      reason: reason,
      status: "pending",
    });
    if (dbResponse.acknowledged) {
      return { success: true, data: "wait of aprove" };
    }
    return { success: false, message: "plz try again.." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const getAllLeaves = async (userId) => {
  // let userId = global.userId;


  const collection = Connection.conn.db("test").collection("leaves");
  try {
    try {
      const dbResponse = await collection.find({userId:userId},{projection:{ _id: 0}}).toArray();
      console.log("---------",dbResponse);
            return { success: true, data: dbResponse };
    } catch (error) {
      return { success: false, message: error.message };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};


module.exports = { saveLeave,getAllLeaves  };
