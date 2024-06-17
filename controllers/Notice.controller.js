const notices = require('../models/notice.model')


// הוספת הודעה      
const addNotice = (req, res) => {
    const notice = new notices(req.body)
    notice.save().then((notice) => {
        res.send("success add notice!")
    }).catch(err => {
        console.log("eror in add notice! "+err)
    })
}

module.exports = { addNotice }