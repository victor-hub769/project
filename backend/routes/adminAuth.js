import express from "express";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt"; //used to encrypt passwords
import jwt from "jsonwebtoken"; // gives us tokens(very long string that contains data)
import { checkAdminAuth } from "./checkAuth.js";




const router = express.Router();
const saltRound = 10;

router.post("/admin/register", (req, res) => {
  try {
    if (!req.body || !req.body.password) {
      res.send({
        message: "Admin details not found",
      });
    }

    bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
      if (err) {
        console.log(err);
      } //logic for storing to db
      const newAdmin = new adminModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      const admin = await newAdmin.save();
      const token = jwt.sign({ adminId: admin._id }, "MY_SECRET_KEY");
      res.send({
        message: "Admin Created Successfully",
        data: admin,
        token: token,
      });
    });
  } catch (error) {
    res.send({
      message: "Error Ocurred",
      data: error.message,
    });
  }
});
router.post("/admin/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({
      message: "wrong password or email",
    });
  } else {
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) {
      res.send({
        message: "wrong passord or email",
      });
    } else {
      bcrypt.compare(req.body.password, admin.password, (err, response) => {
        if (err) {
          console.log(err);
        }
        if (response === false) {
          res.send({
            message: "wrong password or email",
          });
        } else if (response === true) {
          const token = jwt.sign({ adminId: admin._id }, "MY_SECRET_KEY");
          res.send({
            message: "admin authenticated successfully",
            data: admin,
            token: token,
          });
        }
      });
    }
  }
});

router.get("/admin/get-me", checkAdminAuth, (req, res) => {
  res.send({
    message: "Successfully found Authenticated admin",
    data: req.admin,
  });
});

router.post("/admin/update-me", checkAdminAuth, async (req, res) => {
  try {
    const admin = await adminModel.findOne({ _id: req.admin._id });
    admin.firstName = req.body.firstName;
    admin.lastName = req.body.lastName;
    admin.email = req.body.email;
    const newAdmin = await admin.save();
    res.send({
      message:'Updated admin Successfully',
      data: newAdmin
    })
  } catch (error) {
    res.send({
      message: "Error ocurred",
      data: error.message,
    });
  }
});

export default router;
