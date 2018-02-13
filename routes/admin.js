const express = require('express');
const router = express.Router();
const authUtil = require('../util/auth');

/* GET home page. */
router.get('/', authUtil.auth, (req, res, next) => {
    res.render('admin', { title: 'Simple session app - admin panel' });    
});

module.exports = router;
