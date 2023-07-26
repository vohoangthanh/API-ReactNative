var express = require('express');
var router = express.Router();
var modelSchedule = require('../models/schedule');

// lấy lichj hoc 
router.get('/', async function (req, res, next) {

  var data = await modelSchedule.find({});
  res.json({ data });
});

// lấy giá trị có Ca học lớn hơn bằng 1 hoặc<= 4 không phân biệt chữ hoa thường
router.get('/query', async function (req, res, next) {
  var adress = req.query.adress;
  var query = {
    $or: [
      { shift: { $gte: 1, $lte: 4 } },
      // { adress: {$regex : adress, $options: 'i'} },
    ]
  }
  // sawsp xeesp tăng dần
  var data = await modelSchedule.find(query, 'shift name date adress').sort({ shift: 1 });
  res.json(data);
});

// thêm lich hoc
// http://localhost:3000/schedule/add
router.post('/add', async function (req, res, next) {
  try {
    const { date, teacher, shift, idSubject, idUser, adress, day, dayin, subjectcode, timestart, timeend } = req.body;
    // tao model
    const scheduleInsert = { date, shift, idSubject, idUser, teacher, adress, day, dayin, subjectcode, timestart, timeend };
    await modelSchedule.create(scheduleInsert);

    res.json({ status: 1, message: ' thêm thành công' });
  } catch (error) {
    res.json({ status: 0, message: 'thêm thất bại' });

  }
});
// sửa lich hoc
// http://localhost:3000/schedule/edit
router.post('/edit', async function (req, res, next) {
  try {
    const { _id, date, shift, idSubject, teacher, idUser, adress, day, dayin, subjectcode, timestart, timeend } = req.body;

    var item = await modelSchedule.findById(_id);
    // tao model
    if (item) {
      item.date = date ? date : item.date;
      item.shift = shift ? shift : item.shift;
      item.idSubject = idSubject ? idSubject : item.idSubject;
      item.idUser = idUser ? idUser : item.idUser;
      item.adress = adress ? adress : item.adress;
      item.day = day ? day : item.day;
      item.dayin = dayin ? dayin : item.dayin;
      item.subjectcode = subjectcode ? subjectcode : item.subjectcode;
      item.timestart = timestart ? timestart : item.timestart;
      item.timeend = timeend ? timeend : item.timeend;
      item.teacher = teacher ? teacher : item.teacher;
      await item.save();
      res.json({ status: 1, message: "Sửa sản phẩm thành công" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
  }

});

// Xóa lich hoc
// http://localhost:3000/schedule/delete
router.get("/delete", async function (req, res, next) {
  try {
    var id = req.query.id;
    await modelSchedule.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
  }
});




module.exports = router;