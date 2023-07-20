const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const subject = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: { type: String, trim: true, },
    teacher: { type: String },
    type: { type: String }
});
module.exports = mongoose.models.subject || mongoose.model('subject', subject);