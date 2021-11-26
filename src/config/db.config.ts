import dotenv from 'dotenv';

dotenv.config();

const config = {
  CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};

export default config;