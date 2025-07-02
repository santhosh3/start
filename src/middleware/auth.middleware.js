
const authUser = (req, res, next) => {
    let token = req.headers.Authorization;

    if(!token) {
        return res.status(401).send({status : false, message : "Unauthorized user"});
    }

    try {
        
    } catch (error) {
        
    }
}