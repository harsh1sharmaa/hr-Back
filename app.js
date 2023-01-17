const express = require("express");
const bodyparser = require('body-parser')
const {Connection}=require("./models/connection");
const globalMiddleware = require("./middleware/authmiddleware");
require('dotenv').config()

const app = express();


// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


const PORT = process.env.PORT || 4000;
Connection.open();


const userRouter = require("./route/user");
const leaveRouter = require("./route/leave");
const authRouter = require("./route/auth");
console.log(app.get('env'))

app.use("/auth", authRouter);
app.use("/", authRouter);
app.use(globalMiddleware.globalMiddleware);
app.use("/user", userRouter);
// app.use("/v1", leaveRouter);

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running");
  else console.log("Error occurred, server can't start", error);
});
