const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    id: { type: ObjectId }, // khóa chính
    email: { type: String},
    password: { type: Number },
    status: {type: Number},
});
module.exports = mongoose.models.user || mongoose.model('user', user);