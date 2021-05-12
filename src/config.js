const dotenv = require('dotenv');
const envVars = dotenv.config({ path: `${__dirname}/../.env` }).parsed;

const configVars = {
  ORDER_STATUS: {
    NEW: 'NEW',
    DONE: 'DONE',
    CANCELLED: 'CANCELLED',
    IN_PROGRESS: 'IN PROGRESS',
  },
};

module.exports = { ...configVars, ...envVars };
