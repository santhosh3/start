require('dotenv').config();


let obj = {
    port : process.env.PORT,
    mongo : process.env.MONGO_URL
}

module.exports = obj;