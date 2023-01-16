const { Connection } = require("./connection.js");
const helper = require("../components/helper");

const saveUser = async (data) => {
  let name = data.name;
  let email = data.email;
  let password = data.password;
  let phone = data.phone;
  password = await helper.hashPassword(password);
  if (password === undefined) {
    return { success: false, message: "some error" };
  }
  let UUID = helper.createUUID(15);
  console.log(UUID);
  console.log("in models password hash");
  console.log(password);
  const collection = Connection.conn.db("test").collection("userdetails2");
  const loggedInCollection = Connection.conn.db("test").collection("loggedin");

  try {
    const dbResponse = await collection.insertOne({
      userId: UUID,
      name: name,
      email: email,
      password: password,
      phone: phone,
      userstatus: "inactive",
      login: [],
    });
    await loggedInCollection.insertOne({
      userId: UUID,
      email: email,
      login: [],
    });
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateUser = async (data) => {
  let userId = global.userId;
  let otherinfo = data.otherinfo;
  console.log(otherinfo);
  const collection = Connection.conn.db("test").collection("userdetails2");
  try {
    const dbResponse = await collection.updateOne(
      {
        userId: userId,
      },
      { $set: { otherinfo: otherinfo } }
    );
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const getUser = async (userId) => {
  console.log(userId);
  const collection = Connection.conn.db("test").collection("userdetails2");
  try {
    const dbResponse = await collection.findOne({
      userId: userId,
    });
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const getUserLogins = async (userId) => {
  console.log(userId);
  const collection = Connection.conn.db("test").collection("loggedin");
  try {
    const dbResponse = await collection.findOne({
      userId: userId,
    });
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const updateUserLoggedIn = async (data) => {
  let userId = global.userId;
  let time = data.time;
  let date = data.date;
  console.log(new Date());
  const collection = Connection.conn.db("test").collection("loggedin");
  try {
    const dbResponse = await collection.updateOne(
      {
        userId: userId,
      },
      { $push: { login: { time: time, day: date } } }
    );
    return { success: true, data: dbResponse };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const validateLogin = async (data) => {
  const collection = Connection.conn.db("test").collection("userdetails2");
  let email = data.email;
  let password = data.password;
  password = await helper.hashPassword(password);
  console.log("in models password hash");
  console.log(password);
  try {
    let validateResponse = await collection.find({ email: email }).toArray();

    console.log("validate Response in models ");
    console.log(validateResponse);
    if (validateResponse.length == 0) {
      return { success: false, message: "login fail" };
    }
    console.log(validateResponse);
    let user_detail = validateResponse[0];
    let db_password = user_detail.password;
    let user_Id = user_detail.userId;

    if (db_password.localeCompare(password)) {
      console.log("password match");
      return {
        success: true,
        data: { message: "login success", userId: user_Id },
      };
    } else {
      return { success: false, message: "login fail" };
    }

    // if (validateResponse.length > 0) {
    //   return { success: true, data: "login success" };
    // } else {
    // }
  } catch (error) {
    console.log(error);
    return { sucess: false, message: error };
    // res.status(500).json({ error });
  }
};

module.exports = {
  saveUser,
  updateUser,
  validateLogin,
  updateUserLoggedIn,
  getUser,
  getUserLogins,
};
