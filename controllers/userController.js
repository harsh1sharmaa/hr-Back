const {
  saveUser,
  updateUser,
  updateUserLoggedIn,
  getUser,
  getUserLogins,
} = require("../models/user");
const { saveLeave } = require("../models/leave");
const saveUserInfo = async (req, res) => {
  let data = req.body;

  console.log(data.name);
  if (data.name != undefined && data.age != undefined) {
    try {
      await saveUser(data);
      res.status(200).send({ success: true, data: "user added" });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "name or age in missing" });
  }
};
const markLogin = async (req, res) => {
  let data = req.body;

  console.log(data);
  if (
    data.date != undefined &&
    data.time != undefined &&
    data.sign_in_location != undefined
  ) {
    try {
      let response = await updateUserLoggedIn(data);
      res.status(200).send({ success: true, data: response });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "some required data is missing" });
  }
};
const addUserInfo = async (req, res) => {
  let data = req.body;

  console.log(data);
  if (data.user_info !== undefined) {
    try {
      let response = await updateUser(data);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "required data is missing" });
  }
};
const getUserInfo = async (req, res) => {
  let userId = global.userId;
  console.log(userId);
  if (userId != undefined) {
    try {
      let response = await getUser(userId);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "user token error" });
  }
};
const getLoginInfo = async (req, res) => {
  let userId = global.userId;
  console.log(userId);
  if (userId != undefined) {
    try {
      let response = await getUserLogins(userId);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "user token error" });
  }

  // userModel.save(req.body)
  // res.send(req.body);
};

const applyLeave = async (req, res) => {
  let data = req.body;
  let userId = global.userId;

  console.log(data);
  // process.exit();
  if (
    userId != undefined &&
    data.to != undefined &&
    data.from != undefined &&
    data.reason != undefined
  ) {
    try {
      let response = await saveLeave(data);
      if(response.success){

        return res.status(200).send({ success: true, data: response.data });
      }else{
        return res.status(200).send({ success: false, message: response.message });
      }
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "required data is missing" });
  }
};
const uploadImage = async (req, res) => {
  let data = req.file;
  console.log(data);
  // const uploadedFile = req.file;
return res.send({data})
  console.log(data);
  process.exit(0);
  
};

module.exports = {
  saveUserInfo,
  markLogin,
  addUserInfo,
  getUserInfo,
  getLoginInfo,
  applyLeave,
  uploadImage
};
