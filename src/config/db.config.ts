import dotenv from 'dotenv';

dotenv.config();

const config = {
  dev: {
    CONNECTION_STRING: process.env.DB_DEV_CONNECTION_STRING,
  },
  test:{
    CONNECTION_STRING: process.env.DB_TEST_CONNECTION_STRING,
  },
  prod:{
    CONNECTION_STRING: process.env.DB_PROD_CONNECTION_STRING,
  }
};

export default config;