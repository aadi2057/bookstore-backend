const multer = require("multer");

const express = require("express");
const bodyParser = require("body-parser");

const Books = require("../models/books");

const cors = require("./cors");
var authenticate = require("../authenticate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/books");
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

const bookImage = express.Router();
bookImage.use(bodyParser.json());

bookImage
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    upload.single("bookImage"),
    (req, res) => {
      console.log(req.file);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(req.file);
    }
  );

module.exports = bookImage;
