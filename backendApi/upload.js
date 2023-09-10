const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const spacesEndpoint = new aws.Endpoint("blr1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "DO00QPQ4XHGAFE3RAJTM",
  secretAccessKey: "Ch+dorKSWIHuA//ChjS+MlZ60sDmlqCopeF7XlE7yl8",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "picapoolcdn",
    acl: "public-read",
    key: function (req, file, cb) {
      // //console.log(file);
      cb(null, uuidv4() + file.originalname);
    },
  }),
});

router.post("/", upload.single("file"), async function (req, res, next) {
  console.log("suraj");
  res.json({
    message: "Successfully uploaded " + req.file.location + " location!",
    url: req.file.location,
  });
});

module.exports = router;
