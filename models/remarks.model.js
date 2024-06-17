const mongoose = require('mongoose');

const remarksSchema = mongoose.Schema({

    date: {
        type: String,
        default:Date.now
    },
    stars: {
        type: Number,
    },
    remark: {
        type: String
    },
    pUser: {
        type: mongoose.Types.ObjectId,
        ref: 'privetUser'
    },
    pUserName:{type: String},
    bUser: {
        type: mongoose.Types.ObjectId,
        ref: 'businessUser'
    }
})

module.exports = mongoose.model('remark', remarksSchema)