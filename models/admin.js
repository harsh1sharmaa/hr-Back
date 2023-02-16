const { Connection } = require("./connection.js");
const getUsers = async () => {
    const collection = Connection.conn.db("test").collection("userdetails2");
    try {
      const dbResponse = await collection.find({},{projection:{ _id: 0,password:0 }}).toArray();
      console.log("---------",dbResponse);
            return { success: true, data: dbResponse };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
const getlogins = async (userId) => {
    const collection = Connection.conn.db("test").collection("loggedin");
    try {
      const dbResponse = await collection.findOne({userId: userId});
      console.log("---------",dbResponse);
            return { success: true, data: dbResponse };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };


const updateLeave = async (data) => {
    let status = data.status;
    let leaveId = data.leaveId;
    const collection = Connection.conn.db("test").collection("leaves");
    try {
      const dbResponse = await collection.update(
        {
          leaveId: leaveId,
        },
        { $set: { status: status } }
      );
      if (dbResponse.acknowledged) {
        return { success: true, data: "status changed" };
      }
      return { success: false, message: "plz try again.." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  module.exports = {getUsers,getlogins,updateLeave}