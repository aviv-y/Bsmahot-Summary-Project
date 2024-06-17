const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "זהו שדה חובה"],
        maxlength: [20, "ארוך מידי"]
    },
    content: {
        type: String,
    },
    date: {
        type: String,
        default:Date.now
    },
    pUser: {
        type: mongoose.Types.ObjectId,
        ref: 'privetUser'
    },
    bUser: {
        type: mongoose.Types.ObjectId,
        ref: 'businessUser'
    }
})

module.exports = mongoose.model('notice', noticeSchema)