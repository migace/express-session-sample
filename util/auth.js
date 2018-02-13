const auth = (req, res, next) => {
    if (!req.session.admin) {
      return res.redirect('/');
    }
  
    return next();
};

exports.auth = auth;
