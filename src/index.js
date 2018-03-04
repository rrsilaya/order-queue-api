import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './router';

const app = express();

app.use(logger('dev'))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});