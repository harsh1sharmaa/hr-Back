const user = require("../models/user");
const helperModel = require("../models/helper");
const register = async (data) => {
  console.log(data);

  let isUserPresent = await helperModel.checkEmailExist(
    data.email,
    "userdetails2"
  );

  // console.log("isUserPresent");
  // console.log(isUserPresent);
  if (isUserPresent === undefined) {
    return { success: false, message: "error in checking user present or not" };
  }
  if (isUserPresent.success) {
    return { success: false, message: isUserPresent.message };
  }
  /*   let isInactiveUserPresent = await helperModel.checkcheckEmailInInactiveUser(
    data.email,
    "userdetails"
  );
  // console.log("isInactiveUserPresent",isInactiveUserPresent);
  if(isInactiveUserPresent.success){
    return { success: true, data: "inactive user present" };
  } */
  let response = await user.saveUser(data);
  if (response !== undefined && response.success) {
    return { success: true, data: "user Registered Successfully" };
  } else {
    return {
      success: false,
      data: "user not  Registered please try again later",
    };
  }
};

const validateUser = async (data) => {
  let userResponse = await user.validateLogin(data);
  if (userResponse !== undefined && userResponse.success) {
    return { success: true, data: userResponse.data };
  } else {
    return { success: false, message: userResponse.message };
  }
};



module.exports = { register, validateUser };
