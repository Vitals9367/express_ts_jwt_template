import dotenv from 'dotenv';

dotenv.config();

const config = {
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  };
  
export default config;