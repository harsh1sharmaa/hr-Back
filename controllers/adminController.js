const { getUsers, getlogins, updateLeave } = require("../models/admin");
const getAllUsers = async (req, res) => {
  console.log(
    "getAllUsers----------------------------------------------------------------"
  );
  //   let data = req.body;

  //   console.log(data.name);
  let role = global.role;
  if (role == "admin") {
    try {
      let response = await getUsers();
      console.log(response);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  } else {
    res.send({ success: false, message: "you dont have this permission" });
  }
};
const getLoginByUserId = async (req, res) => {
  console.log(
    "get all Logins by UserId----------------------------------------------------------------"
  );
  let userId = req.params.userId;

  console.log(userId);
  let role = global.role;
  if (role == "admin") {
    try {
      let response = await getlogins(userId);
      console.log(response);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  } else {
    res.send({ success: false, message: "you dont have this permission" });
  }
};
const changeLeaveStatus = async (req, res) => {
  console.log(
    "update leave status by amin----------------------------------------------------------------"
  );
  let data = req.body;

  console.log(data);
  let role = global.role;
  if (
    role == "admin" &&
    data.leaveId != undefined &&
    data.status != undefined
  ) {
    try {
      let response = await updateLeave(data);
      console.log(response);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  } else {
    res.send({ success: false, message: "you dont have this permission" });
  }
};
module.exports = { getAllUsers, getLoginByUserId, changeLeaveStatus };
