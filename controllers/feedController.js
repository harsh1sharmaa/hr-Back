const { setUserFeed,getfeeds ,addCommentFeed } = require("../models/feed");
const getAllfeeds = async (req, res) => {
  console.log(
    "getAllUsers----------------------------------------------------------------"
  );
  //   let data = req.body;

  //   console.log(data.name);
  // let role = global.role;
  if (userId!=undefined) {
    try {
      let response = await getfeeds();
      console.log(response);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  } else {
    res.send({ success: false, message: "you dont have this permission" });
  }
};
const setFeed = async (req, res) => {
  console.log(
    "getAllUsers----------------------------------------------------------------"
  );
    let data = req.body;

  //   console.log(data.name);
  let userId= global.userId;
  if (data !=undefined && data.name!=undefined && userId!=undefined) {
    try {
      let response = await setUserFeed(data);
      console.log(response);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  } else {
    res.send({ success: false, message: "you dont have this permission" });
  }
};
const addComment = async (req, res) => {
  console.log(
    "addComment----------------------------------------------------------------"
  );
    let data = req.body;

  //   console.log(data.name);
  let userId= global.userId;
  if (data !=undefined && data.feedId!=undefined && data.name!=undefined && userId!=undefined) {
    try {
      let response = await addCommentFeed(data);
      console.log(response);
      res.status(200).send({ success: true, data: response.data });
    } catch (error) {
      res.status(500).send({ success: false, message: error });
    }
  } else {
    res.send({ success: false, message: "you dont have this permission" });
  }
};

module.exports = {  setFeed,getAllfeeds,addComment };
