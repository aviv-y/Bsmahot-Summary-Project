const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
  date: {
    type: String,
    default: Date.now,
  },
  pUser: {
    type: mongoose.Types.ObjectId,
    ref: "privetUser",
    require: [true, "זהו שדה חובה"],
  },
  bUser: {
    type: mongoose.Types.ObjectId,
    ref: "businessUser",
    require: [true, "זהו שדה חובה"],
  },
    contractValue: {
      type: Object,
    },
    signaPU: {
        type:Boolean
    },
    token: {
        type: String
  },
    event:{
      type: mongoose.Types.ObjectId,
    ref: "event",
    }

});

module.exports = mongoose.model('contract', contractSchema)
