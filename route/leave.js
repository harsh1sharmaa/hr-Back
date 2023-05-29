const express = require("express");
const { getLeavesByUserId } = require("../controllers/leaveController");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/get/:userId", getLeavesByUserId);
// router.post("/marklogin",markLogin);

module.exports = router;
