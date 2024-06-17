const mongoose = require('mongoose')

const eventsSchema = mongoose.Schema({
    category: {              
        type: String,         
        required: [true, "זהו שדה חובה"]     
    },
    pUser: {
        type: mongoose.Types.ObjectId,
        ref: 'privetUser',
        require: [true, "זהו שדה חובה"],

    },
    date: {
        type: String,
        require: [true, "זהו שדה חובה"],
        validate: {       //אובייקט ולידציה
            validator: function (v) {       
                return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(v);   //ביטוי רגולרי שע"י המתודה טסט מושווה עם המשתנה
            },
            message: props => `${props.value} is not valid!`
        }
    },
    time: {
        type: String,
    },
    city: {
        type: String,
    },
    area: {
        type: String,
        required: [true, "זהו שדה חובה"]     
    },
    closeProfession: [{   
        type: String,
    }],
    closeBUser: [{   
        type: mongoose.Types.ObjectId,
        ref: 'businessUser'
    }],
})


//יצוא הסכמה כדי שתוכל להכנס למסד הנתונים
module.exports = mongoose.model('events', eventsSchema)
