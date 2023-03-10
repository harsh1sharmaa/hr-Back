const { saveLeave,getAllLeaves } = require("../models/leave");
const applyLeave = async (req, res) => {
  let data = req.body;
  let userId = global.userId;

  console.log(data);
  // process.exit();
  if (
    userId != undefined &&
    data.userName != undefined &&
    data.to != undefined &&
    data.from != undefined
  ) {
    try {
      let response = await saveLeave(data);
      res.status(200).send({ success: true, data: response });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "required data is missing" });
  }
};

const getLeavesByUserId = async (req, res) => {
  let userId = req.params.userId;

  console.log(userId);
  // process.exit();
  if (
    userId != undefined 
  ) {
    try {
      let response = await getAllLeaves(userId);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: true, message: error });
    }
  } else {
    res.send({ success: false, message: "required userId is missing" });
  }
};

module.exports = { applyLeave, getLeavesByUserId };
