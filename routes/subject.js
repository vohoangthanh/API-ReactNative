var express = require('express');
var router = express.Router();
var modelSubject = require('../models/subject');
var upload = require('../util/Upload');

// http://localhost:3000/subject
router.get('/', async function (req, res, next) {
  try {
    const { name, teacher, type } = req.body;
    // tao model
    const subject = {  name, teacher, type };
    await modelSubject.create(subject);

    res.json({ status: 1, message: ' lấy thành công' });
  } catch (error) {
    res.json({ status: 0, message: 'lấy thất bại' });

  }
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
// up 1file
router.post('/upload', [upload.single('image')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://192.168.1.13:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });

    // up load nhiều file
    router.post('/uploads', [upload.array('image',9)],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : [] }); 
            } else {
                const url = `http://192.168.1.13:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });


module.exports = router;