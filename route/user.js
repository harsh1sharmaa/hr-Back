const express = require("express");
const multer = require("multer");
const {
  saveUserInfo,
  markLogin,
  addUserInfo,
  getUserInfo,
  getLoginInfo,
  applyLeave,
  uploadImage,
} = require("../controllers/userController");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where you want to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the saved file
  },
});
const upload = multer({ storage: storage });
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  console.log(global.role);
  if (global.role != "user") {
    return res.send({ success: false, message: "not authorized" });
  }
  next();
});

// define the home page route
// router.post("/save",saveUserInfo);
router
  .post("/marklogin", markLogin)
  .post("/addinfo", addUserInfo)
  .get("/me", getUserInfo)
  .get("/mylogin", getLoginInfo)
  .post("/applyleave", applyLeave)
  .post("/upload", upload.single("file"), uploadImage);

module.exports = router;
