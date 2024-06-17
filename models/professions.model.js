const mongoose = require('mongoose')


const professionsSchema = mongoose.Schema({
    name: {               //שדה שם
        type: String,         // הגדרת השדה לסוג מחרוזת
        required: [true, "זהו שדה חובה"]      //שדה חובה
    }
})


//יצוא הסכמה כדי שתוכל להכנס למסד הנתונים
module.exports = mongoose.model('professions', professionsSchema)
