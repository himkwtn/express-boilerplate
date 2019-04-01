import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';
import { initializeDatabase } from './config/db';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

initializeDatabase();

app.listen(port, () => console.log(`server running on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', routes);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

app.use((err: Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.send(err);
});
