const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

aws.config.update({
  secretAccessKey: "5rb5FEGegaOezo+gO2nDeeEguL2OthpMVAKt1FnU",
  accessKeyId: "AKIAUTV6FTOTOND7Q6XU",
  region: "ap-south-1",
  correctClockSkew: true,
});
const BUCKET = "srijanpoolandsave";
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET,
    key: function (req, file, cb) {
      // console.log(file);
      cb(null, uuidv4() + file.originalname);
    },
  }),
});
router.post("/", upload.single("file"), async function (req, res, next) {
  // console.log("suraj")
  res.send("Successfully uploaded " + req.file.location + " location!");
});

module.exports = router;
