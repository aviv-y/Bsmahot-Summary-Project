const PrivetUser = require('../models/privetUser.model')
const mailerFunc = require('../utils/mailerFunc')
const JWT = require('jsonwebtoken')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../models/token.model");
const bcryptSalt = process.env.BCRYPT_SALT;
const { creatBChatRoom } = require("./BusinessUser.controller");
const ObjectId = require('mongodb').ObjectID;


const hello = (req, res) => {
    console.log('hello');
    console.log(res);
    res.send('hello')

}

// הוספת משתמש      
const signUpPUser = async (req, res) => {
  console.log("signUpPUser function [line 21]: ", req.body);
  const pUser = await new PrivetUser(req.body)
  
  let existsUser = await PrivetUser.findOne({ userMail: pUser.userMail }); //חיפוש משתמש
  if (existsUser){ 
    console.log(" מייל זה כבר קיים במערכת" + existsUser); // מייל קיים=הודעת שגיאה
    res.send({ status: "errExist" });
  }
  console.log("תקין");
  const token = JWT.sign({ email: pUser.userMail }, process.env.SECRET);
  console.log(pUser.userMail);
  new Token({userMail: pUser.userMail, token: token}).save()
  pUser.save().then((pUser) => {  //אם המשתמש נשמר בהצלחה
    //שליחה לריאקט פרטי הבסיס של המשתמש שנרשם
    //נשלח מייל ללקוח
      mailerFunc.sendmail("wellcom", pUser.userMail, pUser.name, null, 0 );
    // res.send("success add privet user! send mail to: " + pUser.userMail)
    res.send({id: pUser._id, name: pUser.name, mess:"success"})
  }).catch(err => {
    console.log("eror in add privet user!" + err);
    res.send("failed");
  })
}

// בקשת איפוס סיסמא
/** 
 * המערכת מחפשת את המשתמש, אם הוא קיים הטוקן שלו נמחק בשביל להכיל טוקן לסיסמא חדשה 
 * לאחמ"כ יהיה מופע חדש של אסימון אקראי שישמר בשרת, וישלח למשתמש
 * במידה ותהיה התאמה- תנתן האפשרות לאפס את הסיסמא
 * **/
const requestResetPassword = async (req, res) => {
  console.log("נכנס לפונקציית איפוס סיסמא");
  const mail = req.body.mail;
  const user = await PrivetUser.findOne({ userMail: mail });
  console.log( " נוד מצא את היוזר הבא: "+ user);
  if (!user) throw new Error("משתמש לא קיים");
  let token = await Token.findOne({ userMail: mail });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userMail: mail,
    token: hash,
    createdAt: Date.now(),
  }).save();
  mailerFunc.sendmail("reqResetPass", mail, user.name, resetToken);
  res.send(true);
};

//איפוס סיסמא
const resetPassword = async (req, res) => {
  const userMail = req.body.mail;
  const token = req.body.token;
  const newPass = req.body.newPass;
  console.log(userMail+" "+token+" "+newPass);
  let passwordResetToken = await Token.findOne({ userMail });
  if (!passwordResetToken) {
    console.log("לא מצאנו אסימון למשתמש זה, או שפג תוקפו");
    res.send("Expired token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    console.log("אסימון איפוס סיסמה לא חוקי או שפג תוקפו");
    res.send("Expired token");
  }
  const hash = await bcrypt.hash(newPass, Number(bcryptSalt));
  await PrivetUser.updateOne(
    { userMail: userMail },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await PrivetUser.findOne({ userMail: userMail });
  mailerFunc.sendmail("resetPassword", userMail, user.name, null);

  await passwordResetToken.deleteOne();
  res.send(true);
};


//לוגין
const loginPUser = async (req, res) => {
  const pUser = PrivetUser.findOne({ userMail: req.body.userMail }).then(async (r, s) => {
    console.log(r);
    const pass = r.password;
    console.log(pass);
    let v = await bcrypt.compareSync(req.body.password, pass); //בדיקת סיסמא
    console.log(v);
    if (v) {
      console.log(r.userMail);
      res.send({id: r._id, name: r.name, mess:"success"})
    }
    else {
      res.send({mess:"err pass"});
    }
  }).catch(err=>res.send(err+"user not exsist!"));
}


//שליפת משתמש
async function showPUser (req, res){
  console.log("showPUser function [line 123]:---",req.body);
  await PrivetUser.find({ _id: ObjectId(req.body.id) }).then((reqst, respns) => {
    console.log("user result [line 125]:---", reqst);
    res.send(reqst);
  })
  .catch(err=>console.log("error in show pUser [line 129]:---",err))
}

//עדכון פרטי משתמש
const updatePUser = async(req, res) => {
  console.log("updatePUser function [line 134]:---", req.body);
  if(req.body.name){
    await PrivetUser.updateOne(
      { _id: req.body.id },
      { $set: { name: req.body.name } }
    )
      .then((reqst, respns) => {
        console.log(reqst);
      })
      .catch(console.log("error update name  [line 143]"));
  }
  if(req.body.phone){
    await PrivetUser.updateOne({ _id: req.body.id }, { $set: { phone: req.body.phone } })
      .then((reqst, respns) => {
      console.log(reqst);
    }).catch(console.log("error update phone"));
  }
  if(req.body.userMail){
    await PrivetUser.updateOne({ _id: req.body.id }, { $set: { userMail: req.body.userMail } })
      .then((reqst, respns) => {
      console.log(reqst);
    }).catch(err=>console.log("error update mail     ", err));
  }
  res.send("success update")
  // showPUser({body:{ _id: req.body.id }});
}

//הוספת חדר התכתבות
const creatChatRoom = async (messD) => {
  const lenD = messD.details.length-1;
  await PrivetUser.updateOne({ _id: messD.pUser }, { $push: { chatRoom: { idMessR: messD._id, bUserName: messD.bUserName, lastDate: messD.details[lenD].date } } })
    .then(async() => {
      console.log("success add chat room to pUser");
      await creatBChatRoom(messD);
  }).catch(err => console.log("error add chat room to pUser    ", err));
}


// // //צפיה בכל החיפושים
// // const showSearchs = (req, res) => {
// //     pUser.findById({ _id: req.params.id }).populate('history', ['city', 'temp'])
// //         .then((result) => {
// //             res.send(result)
// //         })
// //         .catch((err) => { console.log(`error in find your searches!: ${err}`) })
// // }


// // //מחיקת חיפוש
// // const deleteSearch = (req, res) => {
// //     Weather.findByIdAndDelete({ '_id': req.params.id }).then((weather) => {
// //         res.send("the weather deleted!");
// //         console.log(weather.pUserId);
// //         //pUser.findByIdAndUpdate(weather.pUserId, { $pull:{ 'history': req.params.id } })
// //     })
// //         .catch((err) => { console.log(`problem in delete weather!: ${err}`); })
// // }


// // העלאת תמונת פרופיל
// const uploadImgP=() =>{
//     app.get('/', (req, res) => {
//         PrivetpUser.find({}, (err, items) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('An error occurred', err);
//             }
//             else {
//                 res.render('imagesPage', { items: items });
//             }
//         });
//     });
//     // Step 8 - the POST handler for processing the uploaded file

//     app.post('/', upload.single('image'), (req, res, next) => {

//     	var obj = {
//     		name: req.body.name,
//     		desc: req.body.desc,
//     		img: {
//     			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//     			contentType: 'image/png'
//     		}
//     	}
//     	imgModel.create(obj, (err, item) => {
//     		if (err) {
//     			console.log(err);
//     		}
//     		else {
//     			// item.save();
//     			res.redirect('/');
//     		}
//     	});
//     });

// }


module.exports = {
  hello, signUpPUser, requestResetPassword, resetPassword, loginPUser, showPUser, updatePUser, creatChatRoom/*, uploadImgP */
}