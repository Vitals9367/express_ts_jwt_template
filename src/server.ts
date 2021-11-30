import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rootRouter from './routes';

import { initDb } from './utils/dbHelpers';

const port = 3000;
const corsOptions = {origin: "http://localhost:3000"};

console.log(`=============== Starting server on ${process.env.NODE_ENV.trim()} environment =============== \n\n`);

const app = express();

// cors options
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/api', rootRouter);

initDb()
.then(() =>{

  app.listen(port, () => {
    console.log(`----> Server started! \n      PORT: ${port} \n      ENV: ${process.env.NODE_ENV.trim()} \n`);
    app.emit('appStarted');
  });

})
.catch((err) => {
  return console.log(`\n ----> Failed to initialize database: ${err}`);
})


export default app;

