const mongoose = require('mongoose');


const imageSchena = mongoose.Schema(
  {
    image: {type: String,},
    pUser: {
      type: mongoose.Types.ObjectId,
      ref: "privetUser",
    },
    bUser: {
      type: mongoose.Types.ObjectId,
      ref: "businessUser",
        },
    userType: Boolean,
    imageType: Boolean
  },
  

  { collection: "Images" }
);

module.exports = mongoose.model("Images", imageSchena);