module.exports = function errorHandler(error, req, res, next) {
  return res.redirect(`/error/index.html?error=${error.message}`);
};
