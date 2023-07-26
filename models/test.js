const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const test = new Schema({
    id: { type: ObjectId }, // khóa chính
    date: { type: String, trim: true, },
    shift: { type: Number},
    adress: { type: String },
    day: { type: Number },
    dayin: { type: String },
    subjectcode: { type: String },
    timestart: { type: String },
    timeend: { type: String },
    idSubject: { type: ObjectId, ref: 'subject' } ,
    idUser: { type: ObjectId, ref: 'user' } ,
});
module.exports = mongoose.models.test || mongoose.model('test', test);