import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

app.get('/test', (req, res) => {
  return res.status(200).send('PROJECT BAGAS!');
});

app.listen(3650, () => console.log('App is running at port 3650'));
