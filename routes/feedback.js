var express = require('express');
var router = express.Router();
var modelFeedback = require('../models/feedback');
var sendMail = require('../util/sendMail');


router.get('/', async function (req, res, next) {

  var data = await modelFeedback.find({});
  res.json({ data });
});

router.get("/get/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await modelFeedback.findById(id);
    res.json({ status: 1, data });
  } catch (err) {
    console.error("Lỗi khi lấy feeback:", err);
    res.json({ status: 0, message: "Đã xảy ra lỗi khi lấ" });
  }
});


router.post('/add', async function (req, res, next) {
  try {
    const { title, date, email, status, name, mssv, idUser } = req.body;
    // tao model
    const FeedInsert = { title, date, email, status, name, mssv, idUser };
    await modelFeedback.create(FeedInsert);

    res.json({ status: 1, message: ' thêm thành công' });
  } catch (error) {
    res.json({ status: 0, message: 'thêm thất bại' });

  }
});

router.post('/edit', async function (req, res, next) {
  try {
    const { _id, title, date, email, status, name, mssv, idUser } = req.body;

    var item = await modelFeedback.findById(_id);
    // tao model
    if (item) {
      item.title = title ? title : item.title;
      item.date = date ? date : item.date;
      item.email = email ? email : item.email;
      item.status = status ? status : item.status;
      item.name = name ? name : item.name;
      item.mssv = mssv ? mssv : item.mssv;
      item.idUser = idUser ? idUser : item.idUser;
      await item.save();
      res.json({ status: 1, message: "Sửa sản phẩm thành công" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
  }

});
router.post('/send-mail', async function (req, res, next) {
  try {
    const { to, subject, content } = req.body;

    const mailOptions = {
      from: "Vo Hoang Thanh<thanh270701@gmail.com",
      to: to,
      subject: subject,
      html: content
    };
    // tao model

    await sendMail.transporter.sendMail(mailOptions);
    res.json({ status: 1, message: "Gửi mail thành công" });

  } catch (err) {
    res.json({ status: 0, message: "gửi mail phẩm thất bại" });
  }

});

module.exports = router;
