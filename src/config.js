const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: '3001',
  NODE_ENV: 'local_development',
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
  STRIPE_PUBLIC_KEY:
    'pk_test_51Fa7TWKyucmbfgO2k9j41LfOVCR0YDjQDWJZsv75aaIRFCCATKhc7zBg30jKwQjOdK57yH8Qx1ts6MIxQWtTKxOx00TLgOt60u',
  STRIPE_SECRET_KEY:
    'sk_test_51Fa7TWKyucmbfgO2ccZajIygKaIYqz1zymEYKM7sgpaCZmP41qSeIejldlE6bEoSNnkRLg0jauV5ZsjtJq8ZKEol00YrIvFNB9',
  SALES_TAX_RATE: '0.087',
  JWT_SECRET: 'some_test_secret_or_something',
  JWT_ALGORITHM: 'HS256',
  DEV_HOST: 'trbikes.kitchen.local',
  REACT_WEBAPP_BASE_URL: 'http://localhost:3000',
  ORDER_STATUS: {
    NEW: 'NEW',
    DONE: 'DONE',
    CANCELLED: 'CANCELLED',
    IN_PROGRESS: 'IN PROGRESS',
  },
};
