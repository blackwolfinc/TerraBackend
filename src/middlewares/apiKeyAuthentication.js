const ApiError = require('../helpers/errorHandler');

module.exports = (req, res, next) => {
  const apiKeyHeader = req.header('x-api-key');
  const apiKeyEnv = process.env.API_KEY;

  if (apiKeyHeader && apiKeyHeader === apiKeyEnv) {
    return next();
  }

  throw ApiError.unauthorized('You are not authorized');
};
