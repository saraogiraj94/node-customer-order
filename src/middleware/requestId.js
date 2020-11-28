var shortid = require("shortid");
// To generate a unique ID, use shortid.generate()
function addRequestId(req, res, next) {
  req.trace = {
    id: shortid.generate(),
    timestamp: Math.floor(new Date().getTime() / 1000),
    path: req.originalUrl,
  };
  res.setHeader("x-request-id",req.trace.id)
  next();
}

module.exports = addRequestId