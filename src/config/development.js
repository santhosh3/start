require("dotenv").config();



let obj = {
  port: process.env.PORT,
  jwt: process.env.JWT_SECRET
};

module.exports = obj;
