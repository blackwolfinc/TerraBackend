const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();
const dbConnection = require('./models/index');
const routers = require('./routers/index');
const ApiError = require('./helpers/errorHandler');
const responseHandler = require('./helpers/responseHandler');

class Application {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5050;
    this.plugins();
    this.routers();
    this.start();
  }

  plugins() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(compression());
  }

  routers() {
    this.app.get('/test', (req, res, next) => {
      responseHandler.succes(res, 'Test route');
    });

    this.app.use('/api', routers);

    this.app.use((req, res, next) => {
      next(ApiError.notFound('Page not found!'));
    });

    this.app.use((error, req, res, next) => {
      console.error('Error:', error.message);
      return res.status(error.status || error.code || 500).send(error);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('App is running at port ' + this.port);
      dbConnection.sequelize
        .authenticate()
        .then(() => console.log('Success connected to database'))
        .catch((err) => console.log(err.message));
    });
  }
}

const app = new Application();
app;
