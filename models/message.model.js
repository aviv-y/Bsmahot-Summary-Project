const mongoose = require('mongoose');
const bcrypt = require("bcrypt");  //ספריית חיזוק סיסמאות
const bcryptSalt = process.env.BCRYPT_SALT;

const messageSchema = mongoose.Schema({
  token: {
    type: String,
    index: true,
    auto: true,
  },
  pUser: {
    type: mongoose.Types.ObjectId,
    ref: "privetUser",
  },
  bUser: {
    type: mongoose.Types.ObjectId,
    ref: "businessUser",
  },
  pUserName: { type: String },
  bUserName: { type: String },
  prof: { type: String },
  event: {
    type: mongoose.Types.ObjectId,
    ref: "events",
  },
  details: [
    {
      userType: {
        type: String,
        default: "0",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      text: { type: String },
    },
  ],
});
messageSchema.post("save", async function (next) {
    if (!this.isModified("token")) {
        return;
    }
  
    const hash = await bcrypt.hash(this.token, Number(bcryptSalt));
  this.token = hash;
    this.update({ token: hash });
});

module.exports = mongoose.model('message', messageSchema)