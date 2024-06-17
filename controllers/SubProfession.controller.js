const SubProfessions = require('../models/subProfessions.model');
var ObjectId = require('mongodb').ObjectID;



// הוספת תת מקצוע      
const addSProfession = (req, res) => {
    const Sprofession = new SubProfessions(req.body)
    Sprofession.save().then((Sprofession) => {
        res.send("success add sub profession!")
    }).catch(err => {
        console.log("eror in add sub profession!")
    })
}

//הצגת תתי מקצוע לפי מקצוע מתקבל
const showSubProfession = async(req, res) => {
    console.log("שליפת תתי מקצועות", req.body);
    // console.log(req);
    await SubProfessions.find({ profession: ObjectId(req.body.id) }).then((reqst, respns) =>{
        res.send(reqst);
        console.log(reqst);
        })
    .catch(err=>console.log(err+"error in show all prof"))
}

module.exports = { addSProfession, showSubProfession }