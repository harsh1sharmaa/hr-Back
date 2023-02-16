const express = require("express");
const { getAllUsers,getLoginByUserId,changeLeaveStatus} = require("../controllers/adminController");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now()); 
  console.log(global.role);
//  if(global.role !="admin"){
//   return res.send({"success":false,"message":"hello not authorized"})
//  }
  next();
});

// define the home page route
// router.post("/save",saveUserInfo);
router.get("/getusers",getAllUsers);
router.get("/logins/:userId",getLoginByUserId);
router.post("/updateleave",changeLeaveStatus);
// router.get("/me",getUserInfo);
// router.get("/mylogin",getLoginInfo);

module.exports = router;