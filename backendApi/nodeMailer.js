

// const SECRET_KEY = "Suraj_kumar";
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "znsuraj7@gmail.com",
      pass: "zgsrcafffgoobxmh",
    },
  });

// var transporter = nodemailer.createTransport({
//     service: "Godaddy",
//     host: "smtpout.secureserver.net",
//     secureConnection: true,
//     port: 465,
//     auth: {
//       user: "noreply@picapool.com",
//       pass: "Think@9110",
//     },
//   });
  

const nodeMailer = (email,message,subject) => {

    var mailoption = {
        from: "<noreply@picapool.com>",
        to: email,
        subject:subject,
        html:message,
      };

      transporter.sendMail(mailoption, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Verification Mail sent to your mail");
        }
      });
 
};

module.exports = nodeMailer;
