const { Log } = require("../../Logging Middleware/loggingMiddleware");

function logger(stack, pkg) {
  return async (req, res, next) => {
    await Log(stack, "info", pkg, `Incoming ${req.method} ${req.originalUrl}`);
    next();
  };
}

module.exports = logger;
