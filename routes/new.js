var express = require('express');
var router = express.Router();
var modelNew = require('../models/new');

// lấy thông tin người dùng theo id
router.get('/', async function (req, res, next) {

  var data = await modelNew.find();
  res.json(data);
});

//
// thêm tint tức
// http://localhost:3000/new/add
router.post('/add', async function (req, res, next) {
  try {
    const { title, content, date } = req.body;
    // tao model
    const newInsert = { title, content, date };
    await modelNew.create(newInsert);

    res.json({ status: 1, message: ' thêm thành công' });
  } catch (error) {
    res.json({ status: 0, message: 'thêm thất bại' });
  }
});


// sữa tin tức
// http://localhost:3000/new/edit
router.post('/edit', async function (req, res, next) {
  try {
    const {_id, title, content, date  } = req.body;

    var item = await modelNew.findById(_id);
    // tao model
    if (item) {
      item.title = title ? title : item.title;
      item.content = content ? content : item.content;
      item.date = date ? date : item.date;
      
      await item.save();
      res.json({ status: 1, message: "Sửa sản phẩm thành công" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
  }
});

// xóa tin tức
// http://localhost:3000/new/delete
router.get("/delete", async function (req, res, next) {
  try {
    var id = req.query.id;
    await modelNew.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
  }
});


module.exports = router;