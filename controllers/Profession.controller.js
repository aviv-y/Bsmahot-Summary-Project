const Professions = require('../models/professions.model')

// הוספת מקצוע      
const addProfession = async(req, res) => {
    const profession = new Professions(req.body)
    await profession.save().then((profession) => {
        res.send("success add profession!")
    }).catch(err => {
        console.log("eror in add profession!"+err)
    })
}

//שליפת כל המקצועות
const showAllProfession = async (req, res) => {
    await Professions.find({}).then((reqst, respns) => {
        // console.log(reqst);
        res.send(reqst)
    })
    .catch(err=>console.log(err+"error in show all prof"))
}

module.exports = { addProfession, showAllProfession }