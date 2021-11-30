import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';
import rootRouter from './routes';

const port = 3000;
const corsOptions = {origin: "http://localhost:3000"};

export const startServer = async () => {

  console.log(`Starting server on ${process.env.NODE_ENV.trim()} environment`);

  try{
    console.log('Connecting to database!');

    await db.sequelize.authenticate();
    console.log(' -- Connection to database has been established successfully.');

    await db.sequelize.sync();
    console.log(' -- Database tables synced.');

  }catch (error){
    console.error('Database error:', error);
  }

  const app = express();

  // cors options
  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // api routes
  app.use('/api', rootRouter);

  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
  });
  
  return app;

}

startServer();
