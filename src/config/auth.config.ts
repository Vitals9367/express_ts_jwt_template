import dotenv from 'dotenv';

dotenv.config();

const config = {
  SECRET: process.env.AUTH_SECRET,
};

export default config;