const Events = require("../models/events.model");
const Message = require("../models/message.model");
const mailerFunc = require("../utils/mailerFunc");
const { showBUser } = require("./BusinessUser.controller");
var ObjectId = require("mongodb").ObjectID;

// הוספת אירוע
const newEvent = (req, res) => {
  console.log("newEvent function [line 9]: ",req.body);
  const event = new Events(req.body);
  event
    .save()
    .then((i) => {
      res.send(i);
    })
    .catch((err) => {
      console.log("eror in add event! " + err);
      res.send("eror in add event! " + err);
    });
};

const showEventById = async (req, res) => {
  console.log("showEventById function [line 23[: ", req.body);
  await Events.findOne({ _id: ObjectId(req.body.idEvent) }).then((e) => {
    console.log(e);
    res.send(e);
  });
};

//שליפת כל האירועים ליוזר מסויים
const showEvents = async (req, res) => {
  console.log("showEvents function [line 31]: ", req.body)
    await Events.find({ pUser: ObjectId(req.body.user) })
      .then((e) => {
        console.log(e);
        res.send(e);
      });
  
};


//עדכון אירוע
const updateEvent = async(req, res) => {
  console.log("updateEvent function [line 42]:---", req.body);
  let prof;
  await showBUser(req)
    .then(result => {
      // console.log("the result from bUser function: [line 47]: ---",result);
      prof = result[0].profession;
    })
    .catch(err => console.log('error in show bUser [line 50]: ---', err));

    // await Events.updateOne(
    //   { _id: req.body.id },
    //   {
    //     $set: {
    //       closeProfession: req.body.Profession,
    //       closeBUser: req.body.bUser
    //     },
    //   }
    // )
    //   .then((reqst, respns) => {
    //     console.log("seccess update event!");
    //     res.send('seccess update event!')
    //   })
    //   .catch(console.log("error update event  [line 56]"));

  await Events.updateOne(
    { _id: req.body.id },
    {
      $set: {
        closeProfession: prof,
        closeBUser: req.body.bUser,
      },
    }
  )
    .then((reqst, respns) => {
      console.log("Success: Update event! [line 77]!");
      res.send("Success: Update event!");
    })
    .catch((error) => {
      console.log("Error: Update event [line 81]---", error);
      res.status(500).send("Error: Update event");
    });
}

//שליחת הודעה
const sendMess = async (req, res) => {
  console.log("sendMess function [line 88]: ", req.body);
  try {
    let mess = await Message.findOne({ token: req.body.token });
    if (mess) {
      // If a message with the given token exists, update it with new details
      await Message.updateOne(
        { token: req.body.token },
        { $push: { details: req.body.details[0] } }
      );
      if (req.body.details[0].text=="אני אשמח לחתום איתך חוזה")
      {
        let d = req.body.details;
        req.body = mess;
        req.body.details = d;
        }
        await commentMess(req.body);
      res.send("success update message!");
    } else {
      // If no message with the given token exists, create and save a new message
      const newMess = new Message(req.body);
      await newMess.save();
      await commentMess(req.body);
      res.send("success add message!");
    }
  } catch (error) {
    console.error("Error in sending message:", error);
    res.status(500).send("Error in sending message: " + error.message);
  }
};

//שמירת ההודעה ושליחה למייל
const commentMess = async (req, res, next) => {
  let uMail, mess;
  if (req.details[0].userType === "1") {
    await Message.findOne({ token: req.token })
      .populate({ path: "pUser", select: "userMail" })
      .then((e) => {
        uMail = e.pUser.userMail;
        mess = e;
      });
  } else {
    await Message.findOne({ token: req.token })
      .populate({ path: "bUser", select: "userMail" })
      .then((e) => {
        uMail = e.bUser.userMail;
        mess = e;
      });
  }

  if (mess && mess.details && mess.details.length >= 1) {
    // Check if the message exists and the details array has at least one item
    const existingDetails = mess.details.map((detail) => detail.text);
    const newDetailText = req.details[0].text;

    // Check if the new detail is already present in the existing details
    if (!existingDetails.includes(newDetailText)) {
      // If the new detail is not present, update the message details
      await Message.updateOne(
        { token: req.token },
        { $push: { details: req.details[0] } }
      );
    }
  }


  //שליחת ההודעה למייל הנמען
  req.details[0].userType === "1"
    ? mailerFunc.sendmail("sendMess", uMail, mess.bUserName, mess.token, req)
    : mailerFunc.sendmail("sendMess", uMail, mess.pUserName, mess.token, req);
};



//הודעה
const showMess = async (req, res) => {
  await Message.findOne({ token: req.body.tkn })
    .then((e) => {
      console.log(e);
      res.send(e)
    })  
}

//שליפת כל חדרי ההתכתבות
const showChatR = async (req, res) => {
  console.log("showChatR function [line 166]: ",req.body)
  if (req.body.userType==1)
    await Message.find({ bUser: ObjectId(req.body.userId) })
      .then((e) => {
        console.log("showChatR BUser function [line 175]:--- ", e);
        res.send(e);
      });
  else await Message.find({ pUser: ObjectId(req.body.userId) })
    // .populate({ path: "bUser", select: "userName" })
    .then((e) => {
      console.log("showChatR PUser function [line 175]:--- ", e);
      res.send(e);
    });
  
};


module.exports = {
  newEvent,
  sendMess,
  commentMess,
  updateEvent,
  showMess,
  showChatR,
  showEvents,
  showEventById,
};
