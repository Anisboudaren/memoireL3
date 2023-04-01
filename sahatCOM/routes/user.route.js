const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const { authToken } = require("../utils/jwt");
userRouter.post("/addNewUser", userController.addNewUser);

userRouter.get(
  "/getUser",
  authToken,
  userController.getUser,
  async (req, res) => {}
);

userRouter.get("/getAllUsers", userController.getAllusers);

module.exports = userRouter;
