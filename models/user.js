const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    id: { type: ObjectId }, // khóa chính
    username: { type: String, trim: true, },
    pass: { type: Number },
    role: { type: String }
});
module.exports = mongoose.models.user || mongoose.model('user', user);