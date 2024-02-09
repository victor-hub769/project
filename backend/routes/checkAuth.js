import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";

export const checkUserAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.send({
      message: "You must be logged in!",
    });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "MY_SECRET_KEY", async (err, data) => {
      if (err) {
        res.send({
          message: "You must be logged in!",
          err: err.message,
        });
      } else {
        const { userId } = data;
        const user = await userModel.findOne({ _id: userId });
        req.user = user;
        next();
      }
    });
  }
};

export const checkAdminAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.send({
      message: "You must be logged in!",
    });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "MY_SECRET_KEY", async (err, data) => {
      if (err) {
        res.send({
          message: "You must be logged in!",
          err: err.message,
        });
      } else {
        const { adminId } = data;
        const admin = await adminModel.findOne({ _id: adminId });
        req.admin = admin;
        next();
      }
    });
  }







}






