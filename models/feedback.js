const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const feedback = new Schema({
    id: { type: ObjectId }, // khóa chính
    title: { type: String },
    date: { type: String },
    email: { type: String },
    status: { type: Number },
    name: { type: String },
    mssv: { type: String },
    idUser: { type: ObjectId, ref: 'user' },
});
module.exports = mongoose.models.feedback || mongoose.model('feedback', feedback);