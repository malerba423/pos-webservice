const dotenv = require('dotenv');
const result = dotenv.config({ path: `${__dirname}/../.env` }).parsed
module.exports = { ...result } 