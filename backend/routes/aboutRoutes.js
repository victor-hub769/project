import express from "express";
// import { checkUserAuth } from "./CheckAuth.js";
import aboutModel from "../models/aboutModel.js";

const router = express.Router();

router.post("/about/create", async (req, res) => {
  try {
    const newAbout = new aboutModel({
      about: req.body.about,
    });

    const response = await newAbout.save();
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/about/get", async (req, res) => {
  try {
    const about = await aboutModel.find();
    res.send({ data: about });
  } catch (error) {
    res.send(error.message);
  }
});

export default router;
