const jwt = require("jsonwebtoken");
const SECRET_KEY = "SampleKey";

/**
 * this funtion Validate the Email address
 * @param {*} email
 * @returns
 */
const validateEmail = function (email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
function generateAccessToken(username, userId,role) {
  return jwt.sign({ email: username, userId: userId,role: role}, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
}


module.exports = { validateEmail,generateAccessToken };
