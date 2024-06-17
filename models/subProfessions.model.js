const mongoose = require('mongoose')


const subProfessionsSchema = mongoose.Schema({
    name: {               //שדה שם
        type: String,         // הגדרת השדה לסוג מחרוזת
        required: [true, "זהו שדה חובה"]      //שדה חובה
    },
    profession: {        //תחום עיסוק- מפתח מתוך טבלת תחומים
        type: mongoose.Types.ObjectId,
        ref: 'professions'
    },
})


//יצוא הסכמה כדי שתוכל להכנס למסד הנתונים
module.exports = mongoose.model('subProfessions', subProfessionsSchema)
