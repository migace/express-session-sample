const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      UserModel = require('../models/user'),
      md5 = require('md5'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple session app' });
});

router.post('/login', (req, res) => {
  const login = req.body.login,
        password = md5(req.body.password);

  UserModel.findOne({ login }, (err, user) => {
      if (err) res.status(500).end(err);
      

      if (user && user.login === login && user.password === password) {
          req.session.admin = true;
          req.session.save();

          res.header('Access-Control-Allow-Credentials', 'true');
          return res.json({
              status: 'OK',
              message: 'Dane poprawne'
          });
      } 

      return res.json({
          status: "ERR",
          message: "Błędne dane"
      });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  
  return res.json({
      status: 'OK',
  });
});

module.exports = router;
