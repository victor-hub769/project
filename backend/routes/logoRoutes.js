import express from "express";
import logoModel from "../models/logoModel.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Multer configuration for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads" });

const uploadLogoImage =   upload.fields([
  { name: "image", maxCount: 1 },
  // { name: "images", maxcount: 4 },
]);
// upload.single("image");

router.post("/logo/create", uploadLogoImage, async (req, res) => {
  try {
    let image = req.files.image[0];
    console.log(image)
    let extension = image.mimetype.split("/")[1];
    let imageNewFileName = image.filename + "." + extension;
    fs.rename(
      `./uploads/${image.filename}`,
      `./uploads/${imageNewFileName}`,
      () => console.log("renamed image successfully")
    );

    const newLogo = new logoModel({
      logo: imageNewFileName,
    });

    const response = await newLogo.save();
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/logo/get", async (req, res) => {
  try {
    const logos = await logoModel.find();
    res.send({ data: logos });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
