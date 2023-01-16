const {saveUser,updateUser,updateUserLoggedIn,getUser,getUserLogins} = require("../models/user");
const saveUserInfo = async (req, res) => {
  let data = req.body;
  
  console.log(data.name);
  if (data.name != undefined && data.age != undefined) {
    try {
      await saveUser(data) ;
      res.status(200).send({success: true , data:"user added"});
    } catch (error) {
      res.status(500).send({success: true , message:error});
    }
  } else {

    res.send({success: false,message:"name or age in missing"});
  }

};
const markLogin = async (req, res) => {
  let data = req.body;
  
  console.log(data);
  if (data.date != undefined && data.time != undefined && data.location != undefined ){

    try {
     let response= await updateUserLoggedIn(data)
      res.status(200).send({success: true , data:response});
    } catch (error) {
      res.status(500).send({success: true , message:error});
    }
  } else {

    res.send({success: false,message:"some required data is missing"});
  }

  
};
const addUserInfo = async (req, res) => {
  let data = req.body;
  
  console.log(data);
  if (data.otherinfo!== undefined) {

    try {
     let response= await updateUser(data)
      res.status(200).send({success: true , data:response.data});
    } catch (error) {
      res.status(500).send({success: true , message:error});
    }
  } else {

    res.send({success: false,message:"required data is missing"});
  }


};
const getUserInfo = async (req, res) => {
  
  let userId = global.userId;
  console.log(userId);
  if (userId != undefined ) {
    try {
     let response= await getUser(userId)
      res.status(200).send({success: true , data:response.data});
    } catch (error) {
      res.status(500).send({success: true , message:error});
    }
  } else {

    res.send({success: false,message:"user token error"});
  }
};
const getLoginInfo = async (req, res) => {
  
  let userId = global.userId;
  console.log(userId);
  if (userId != undefined ) {
    try {
     let response= await getUserLogins(userId)
      res.status(200).send({success: true , data:response.data});
    } catch (error) {
      res.status(500).send({success: true , message:error});
    }
  } else {
    res.send({success: false,message:"user token error"});
  }

  // userModel.save(req.body)
  // res.send(req.body);
};

module.exports = { saveUserInfo ,markLogin ,addUserInfo,getUserInfo,getLoginInfo};
