const express = require('express');
const {register} = require('../controller/user.controller');


const router = express.Router();

// http://locahost:4000/auth/register
router.post('/register', register);


module.exports = router;


