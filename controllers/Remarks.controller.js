const remarks = require("../models/remarks.model");
const mailerFunc = require("../utils/mailerFunc");
var ObjectId = require("mongodb").ObjectID;

// הוספת הערה
const addRemark = async (rmrk, res) => {
  try {
    const remark = new remarks(rmrk.body);
    await remark.save().then(r => {
      console.log(r)
      res.send(200)
    });
    // return "success add remark!";
  } catch (err) {
    console.error("Error in add remark!", err);
    throw err; // Re-throw the error to handle it at a higher level
  }
};

const sendReminder = async (req, res) => {
  console.log(typeof req.body.stars);
    console.log("sendReminder function [line 17]:---", req.body);
    const starIcons = "⭐️".repeat(req.body.stars);
    const details = {
      pUser: req.body.pUserName,
      title: `דירגו אותך עם ${req.body.stars} כוכבים! ${starIcons}`,
      txt: `<br/>
    <h3>התגובה שנשלחה מאת ${req.body.pUserName}:</h3><br/>
    <p>${req.body.remark}</p>
    `,
    };
  try {
    const remark = await addRemark(req.body);
      console.log(remark);
      if (remark == "success add remark!") {
          mailerFunc.sendmail(
            "feedbackToBUser",
            req.body.bUserMail,
            req.body.bUserName,
            0,
            details
          );
         res.status(200).send(remark); // Send success response to client 
      } 
  } catch (error) {
    console.error("Error in sendReminder:", error);
    res.status(500).send("Internal Server Error"); // Send error response to client
  }
};

const showRemarkByBUserId = async (req, res) => {
    console.log("*******************", req.body);
    await remarks.find({ bUser: ObjectId(req.body.bUser) }).then((e) => {
    console.log(e);
    res.send(e);
  });
}

module.exports = { addRemark, sendReminder, showRemarkByBUserId };
