const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schedule = new Schema({
    id: { type: ObjectId }, // khóa chính
    date: { type: String, trim: true, },
    shift: { type: Number},
    adress: { type: String },
    day: { type: Number },
    dayin: { type: String },
    subjectcode: { type: String },
    timestart: { type: String },
    timeend: { type: String },
    teacher:{type: String},
    idSubject: { type: ObjectId, ref: 'subject' } ,
    idUser: { type: ObjectId, ref: 'user' } ,
});
module.exports = mongoose.models.schedule || mongoose.model('schedule', schedule);