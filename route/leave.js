const express = require("express");
const { applyLeave } = require("../controllers/leaveController");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.post("/apply",applyLeave);
// router.post("/marklogin",markLogin);

module.exports = router;
