const express = require("express");
const { saveUserInfo, markLogin ,addUserInfo,getUserInfo,getLoginInfo} = require("../controllers/userController");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
// router.post("/save",saveUserInfo);
router.post("/marklogin",markLogin);
router.post("/addinfo",addUserInfo);
router.get("/me",getUserInfo);
router.get("/mylogin",getLoginInfo);

module.exports = router;
