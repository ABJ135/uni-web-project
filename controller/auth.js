const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const authHead = req.headers.authorization;

  if (!authHead) {
    return res.status(500).json("Authorization not available");
  }

  const token = authHead && authHead.split(" ")[1];

  if (!token) {
    return res.status(500).json("token not provided");
  }

  if (!process.env.Jwt_Key) {
    throw new Error("JWT key not set in environment variables");
  }

  try {
    const dat = jwt.verify(token, process.env.Jwt_Key);
    req.user = dat;
    next();
  } catch (error) {
    console.error("Error verifying token: ", error);

    return res.status(500).json("Error verifying token");
  }
};

module.exports = auth