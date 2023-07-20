var express = require('express');
var router = express.Router();
var modelProduct = require('../models/product');

// lấy danh sách sản phẩm 
//http://localhost:3000/products/list-product
// router.get('/list', async function(req, res, next) {
//   var data = await modelProduct.find().populate('category');
//   res.json(data);
// });

// lấy thông tin sản phẩm theo id 
router.get('/detail', async function (req, res, next) {
  var idSP = req.query.id;
  var data = await modelProduct.findById(idSP);
  res.json(data);
});

// lấy danh sách sản phẩm
router.get('/detail-find', async function (req, res, next) {
  var idSP = req.query.id;
  var priceSp = req.query.price;
  var data = await modelProduct.find({ price: priceSp });
  res.json(data);
});

// lấy danh sách sản phẩm có giá từ bao nhiêu đó
router.get('/list-price', async function (req, res, next) {
  var query = {
    price: { $gte: 10000, $lte: 50000 }
  };
  var data = await modelProduct.find(query); 
  res.json(data);
});

module.exports = router;

