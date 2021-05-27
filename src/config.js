const dotenv = require('dotenv');
dotenv.config();

const envVars = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  SALES_TAX_RATE: process.env.SALES_TAX_RATE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  DEV_HOST: process.env.DEV_HOST,
  REACT_WEBAPP_BASE_URL: process.env.REACT_WEBAPP_BASE_URL,
  KITCHEN_BASE_URL: process.env.KITCHEN_BASE_URL,
};

const constants = {
  ORDER_STATUS: {
    NEW: 'NEW',
    DONE: 'DONE',
    CANCELLED: 'CANCELLED',
    IN_PROGRESS: 'IN PROGRESS',
  },
};

module.exports = {
  ...envVars,
  ...constants,
};
