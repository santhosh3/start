const express = require("express");
const { register, loginUser } = require("../controller/user.controller");
const { createBlog } = require("../controller/blog.controller");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

// http://locahost:4000/auth/register
router.post("/register", register);
router.post("/login", loginUser);
module.exports = router;
