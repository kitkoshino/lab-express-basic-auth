const routeGuard = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/authentication/log-in');
  }
};


module.exports = routeGuard;