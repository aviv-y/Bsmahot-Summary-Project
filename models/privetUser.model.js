const mongoose = require('mongoose')
const bcrypt = require("bcrypt");  //ספריית חיזוק סיסמאות
const bcryptSalt = process.env.BCRYPT_SALT;



const privetUserSchema = mongoose.Schema(
  {
    name: {
      type: String, // הגדרת השדה לסוג מחרוזת
      required: [true, "זהו שדה חובה"], //שדה חובה
    },
    password: {
      type: String,
      minlength: [4, "סיסמא קצרה מידי"], //הגדרת אורך מינימלי
      maxlength: [12, "סיסמא ארוכה מידי"], //הגדרת אורך מקסימלי
      required: [true, "זהו שדה חובה"], //שדה חובה
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(v);
        },
        message: (props) => `${props.value} is not valid!`,
      },
    },
    userMail: {
      type: String,
      required: [true, "זהו שדה חובה"], //שדה חובה
      unique: true, //ערך יחודי
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
        },
        message: (props) => `${props.value} is not valid!`,
      },
    },
    image: { type: String },
    chatRoom: [{}],
  },
  { timestamps: true }, //חותמת זמן
  { typeKey: "$type" }
);

// קידוד והצפנת הסיסמא לפני שמירתה במסד הנתונים
privetUserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});

//יצוא הסכמה כדי שתוכל להכנס למסד הנתונים
module.exports = mongoose.model('privetUser', privetUserSchema)
