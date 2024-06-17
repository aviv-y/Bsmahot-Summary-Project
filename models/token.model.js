mongoose = require("mongoose");
 
const tokenSchema = mongoose.Schema({
  userMail: {
    type: String,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// זמן תפוגה בשניות
    //צריך שיהיה עדכון של זמן זה בכל בקשת גישה, ובמידה והמשתמש לא היה פעיל באתר אז שיפוג הטוקן
    //שלא יהיה מצב של תפוגה באמצע פעילות באתר
  },
});
module.exports = mongoose.model("Token", tokenSchema);