require('dotenv').config();
const development = require('./development');
const production = require('./production');


if(process.env.ENVIRONMENT === "dev") {
    module.exports = development
} else {
    module.exports = production
}