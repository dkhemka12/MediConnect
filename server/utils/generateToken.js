const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign( // jwt.sign() method is used to create a new JSON Web Token.
    {//arg_1: payload 
      userId: user._id,
      role: user.role,
    },
    //arg 2: secret key taken from .env file
    process.env.JWT_SECRET,
    {//arg 3: options : adds expiry time of token
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

module.exports = generateToken;

