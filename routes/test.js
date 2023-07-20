var express = require('express');
var router = express.Router();
var modelTest = require('../models/test');

//http://localhost:3000/test?date=08/08/2023&shift=3&adress=P305
router.get('/', async function (req, res, next) {
  var dateJs = req.query.date;
  var shiftJs = req.query.shift;
  var adressJs = req.query.adress;
  var idUserJs = req.query.idUser; 
  var idSubjectJs = req.query.idSubject; 
  var data = await modelTest.find({ /*date: dateJs, shift: shiftJs, adress: adressJs */}
  , 'date shift adress idUser idSubject');
  res.json(data);
});

// thêm lịch thi
// http://localhost:3000/test/add
router.post('/add', async function (req, res, next) {
  try {
    const { date, shift, idSubject, idUser, adress } = req.body;
    // tao model
    const testInsert = { date, shift, idSubject, idUser, adress };
    await modelTest.create(testInsert);

    res.json({ status: 1, message: ' thêm thành công' });
  } catch (error) {
    res.json({ status: 0, message: 'hêm thất bại' });

  }
});

// sữa lịch thi
// http://localhost:3000/test/edit
router.post('/edit', async function (req, res, next) {
  try {
    const {_id, date, shift, idSubject, idUser, adress } = req.body;

    var item = await modelTest.findById(_id);
    // tao model
    if (item) {
      item.date = date ? date : item.date;
      item.shift = shift ? shift : item.shift;
      item.idSubject = idSubject ? idSubject : item.idSubject;
      item.idUser = idUser ? idUser : item.idUser;
      item.adress = adress ? adress : item.adress;
      await item.save();
      res.json({ status: 1, message: "Sửa sản phẩm thành công" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
  }
});

// xoa lich thi
// 
router.get("/delete", async function (req, res, next) {
  try {
    var id = req.query.id;
    await modelTest.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
  }
});

module.exports = router;