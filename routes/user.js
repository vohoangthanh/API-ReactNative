var express = require('express');
var router = express.Router();
var modelUser = require('../models/user');

// lấy thông tin người dùng theo id
router.get('/', async function (req, res, next) {
  
    var data = await modelUser.find({},'username pass');
    res.json(data);
  });

module.exports = router;