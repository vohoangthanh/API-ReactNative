const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const newS = new Schema({
    id: { type: ObjectId }, // khóa chính
    title: { type: String, trim: true, },
    content: { type: String },
    date: { type: String }
});
module.exports = mongoose.models.new || mongoose.model('new', newS);