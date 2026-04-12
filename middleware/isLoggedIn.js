// middelware login.
module.exports = function (req, res, next) {
  if (!req.session.userId) {
    req.session.redirectUrl = req.originalUrl; 
    return res.redirect("/login?error=Please login first");
  }
  next();
};

