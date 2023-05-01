const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3600;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

app.get('/test', (req, res) => {
  return res.status(200).send('PROJECT BAGAS tested in pulling from git to cPannel');
});

app.listen(PORT, () => console.log('App is running at port ' + PORT));
