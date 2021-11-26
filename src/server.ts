import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models';

const port = 3000;
const corsOptions = {origin: "http://localhost:3000"};

const startServer = async () => {

  try{
    await db.sequelize.sync();
    console.log('Database tables synced.');

  }catch (error){
    console.error('Database error:', error);
  }

  const app = express();

  app.use(cors(corsOptions));
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
  });

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}

startServer();