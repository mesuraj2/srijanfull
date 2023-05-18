const jwt = require("jsonwebtoken");
const getCookie = require("cookies-next").getCookie;

// const SECRET_KEY = "Suraj_kumar";

const fetchuser = (req, res, next) => {
  const token = getCookie("authtoken", { req, res });
  if (!token) {
    return res.send({ error: "Please authenticate first" });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.send({ error: "please authenticate first" });
  }
};

module.exports = fetchuser;
