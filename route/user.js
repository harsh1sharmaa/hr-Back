const express = require("express");
const { saveUserInfo, markLogin ,addUserInfo,getUserInfo,getLoginInfo,applyLeave} = require("../controllers/userController");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  console.log(global.role);
  if(global.role !="user"){
    return res.send({"success":false,"message":"not authorized"})
  }
  next();
});

// define the home page route
// router.post("/save",saveUserInfo);
router.post("/marklogin",markLogin);
router.post("/addinfo",addUserInfo);
router.get("/me",getUserInfo);
router.get("/mylogin",getLoginInfo);
router.post("/applyleave",applyLeave);

module.exports = router;