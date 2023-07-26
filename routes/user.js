var express = require('express');
var router = express.Router();
var modelUser = require('../models/user')

// lấy thông tin người dùng theo id
router.post("/", async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await modelUser.findOne({ email, password });

    if (user) {
      const {  email, password} = user;

      res.json({
        id: user._id,
        email,
        password,
        status: 1,
        message: "Đăng nhập thành công",
        
      });
    } else {
      res.json({ status: 0, message: "Đăng nhập thất bại" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Đăng nhập thất bại" });
  }
});

module.exports = router;