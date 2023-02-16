const express = require("express");
const { setFeed,getAllfeeds,addComment} = require("../controllers/feedController");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/feeds",getAllfeeds);
router.post("/feeds",setFeed);
router.post("/comment",addComment);
// router.post("/marklogin",markLogin);

module.exports = router;
