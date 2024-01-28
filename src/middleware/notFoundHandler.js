module.exports = function notFoundHandler(req, res, next) {
  return next(new Error("Path not found"));
};
