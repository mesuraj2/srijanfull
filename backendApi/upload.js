const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "DO00MRMDZ6KC22QMF9LY",
  secretAccessKey: "o8S+tlNmVRvDNB5I/OmXfwEASNAdqAYCFD81cUlhOVU",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "poolandsave",
    acl: "public-read",
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
