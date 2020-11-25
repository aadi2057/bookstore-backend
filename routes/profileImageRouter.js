const multer = require("multer");

const express = require("express");
const bodyParser = require("body-parser");

const User = require("../models/user");

const cors = require("./cors");
var authenticate = require("../authenticate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profile");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const profileRouter = express.Router();
profileRouter.use(bodyParser.json());

profileRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, upload.single("profileImage"), (req, res) => {
    console.log(req.file);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(req.file);
  });

module.exports = profileRouter;
