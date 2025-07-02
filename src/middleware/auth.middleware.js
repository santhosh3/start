const { verifyToken } = require("../utils");

const authUser = (req, res, next) => {
    let token = req.headers.authorization;   // "bearer token"
    if(!token) {
        return res.status(401).send({status : false, message : "Unauthorized user"});
    }
    try {
        token = token.split(" ")[1];
        const {userId} = verifyToken(token);
        req.userId = userId;
        next();
    } catch (error) {
       return res.status(500).send({status : false, message : error.message})   
    }
}

module.exports = {
    authUser
}