var express = require('express');
var router = express.Router();
var modelNew = require('../models/new');
var upload = require('../util/Upload');
var uploadcloudinary = require('../util/cloudinary');

// lấy thông tin người dùng theo id
router.get('/', async function (req, res, next) {

  var data = await modelNew.find({});
  res.json({ data });
});

//
// thêm tint tức
// http://localhost:3000/new/add
router.post('/add', async function (req, res, next) {
  try {
    const { title, content, date, image } = req.body;
    // tao model
    const newInsert = { title, content, date, image };
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
    const { _id, title, content, date, image } = req.body;

    var item = await modelNew.findById(_id);
    // tao model
    if (item) {
      item.title = title ? title : item.title;
      item.content = content ? content : item.content;
      item.date = date ? date : item.date;
      item.image = image ? image : item.image;

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

// up 1file
router.post('/upload', [upload.single('image')],
  async (req, res, next) => {
    try {
      const { file } = req;
      if (!file) {
        return res.json({ status: 0, link: "" });
      } else {
        const url = `http://192.168.1.13:3000/images/${file.filename}`;
        return res.json({ status: 1, url: url });
      }
    } catch (error) {
      console.log('Upload image error: ', error);
      return res.json({ status: 0, link: "" });
    }
  });


router.post('/cloudinary-upload', uploadcloudinary.single('image'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ secure_url: req.file.path });
});

// // up load nhiều file
// router.post('/uploads', [upload.array('image', 9)],
//   async (req, res, next) => {
//     try {
//       const { file } = req;
//       if (!file) {
//         return res.json({ status: 0, link: [] });
//       } else {
//         const url = `http://192.168.1.13:3000/images/${file.filename}`;
//         return res.json({ status: 1, url: url });
//       }
//     } catch (error) {
//       console.log('Upload image error: ', error);
//       return res.json({ status: 0, link: "" });
//     }
//   });


module.exports = router;