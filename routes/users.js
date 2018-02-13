const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      UserModel = require('../models/user'),
      md5 = require('md5'); 

/* GET users listing. */
router.post('/add', (req, res, next) => {
  const userModel = new UserModel();

  userModel.login = req.body.login;
  userModel.password = md5(req.body.password);

  UserModel.findOne({ login: req.body.login }, (err, user) => {
    if (!user) {
      userModel.save(err => {
        if (err) {
          return res.writeHead(500).send(err);
        }
    
        return res.json({          
          status: "OK",
          message: 'New usser was added to database'
        });
      });
    } else {
      return res.json({
        status: "ERR",
        message: "The given login already exists"
      });
    }
  });  
});

router.delete('/', (req, res) => {
  UserModel.findOneAndRemove({ _id: req.body.id }, (err, doc) => {
    if (err) {
      return res.writeHead(500).send(err);
    }

    res.json({
      status: "OK",
      message: "The user has been deleted"
    });
  })
});

router.get('/', (req, res) => {
  UserModel.find({}, (err, docs) => {
    if (err) {
      return res.writeHead(500).send(err);
    }

    res.json(docs);
  });
});

module.exports = router;
