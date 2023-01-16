const { Connection } = require("./connection.js");

const saveLeave=async(data)=>{

  let name=data.name;
  let userId=data.userId;
  let to=data.to;
  let from=data.from;
  let desc=data.desc;
  const collection = Connection.conn.db("test").collection("leaves");
  try {
    const dbResponse = await collection.insertOne({
      userId:userId,
      name: name,
      to: to,
      from:from,
      desc:desc
    })
    return ({success: true, data: dbResponse})

  } catch (error) {

    return ({success: false, message: error.message})
    
  }
}



module.exports={saveLeave}