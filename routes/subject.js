var express = require('express');
var router = express.Router();
var modelSubject = require('../models/subject');

// http://localhost:3000/subject
router.get('/', async function (req, res, next) {
  var idJs = req.query._id;
  var nameJs = req.query.name;
  var teacherJs = req.query.teacher;
  var typeJs = req.query.type;
  var data = await modelSubject.find({}, 'name teacher type');
  res.json(data);
});

// thêm môn học
// http://localhost:3000/subject/add
router.post('/add', async function (req, res, next) {
  try {
    const { name, teacher, type } = req.body;
    // tao model
    const subjectInsert = { name, teacher, type };
    await modelSubject.create(subjectInsert);

    res.json({ status: 1, message: ' thêm thành công' });
  } catch (error) {
    res.json({ status: 0, message: 'thêm thất bại' });
  }
});


// Sữa môn học
// http://localhost:3000/subject/edit
router.post('/edit', async function (req, res, next) {
  try {
    const {_id, name, teacher, type  } = req.body;

    var item = await modelSubject.findById(_id);
    // tao model
    if (item) {
      item.name = name ? name : item.name;
      item.teacher = teacher ? teacher : item.teacher;
      item.type = type ? type : item.type;
      
      await item.save();
      res.json({ status: 1, message: "Sửa sản phẩm thành công" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
  }
});

// xóa môn học
// http://localhost:3000/subject/delete?id=
router.get("/delete", async function (req, res, next) {
  try {
    var id = req.query.id;
    await modelSubject.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
  }
});

module.exports = router;