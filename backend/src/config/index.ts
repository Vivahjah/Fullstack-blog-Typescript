import dotenv from 'dotenv';









dotenv.config();




const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/myapps',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};
export default config;