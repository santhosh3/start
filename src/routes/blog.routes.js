const express = require("express");
const { findAllBlogs } = require("../controller/blog.controller");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();


router.get("/blog", findAllBlogs);
router.post("/blog", authUser, findAllBlogs);


module.exports = router;