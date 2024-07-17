const BusinessUser = require('../models/businessUser.model')
const mailerFunc = require('../utils/mailerFunc')
const JWT = require('jsonwebtoken')
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../models/token.model");
const bcryptSalt = process.env.BCRYPT_SALT;
const ObjectId = require("mongodb").ObjectID;


// הוספת משתמש      
const signUpBUser = async (req, res) => {
    const bUser = new BusinessUser(req.body)
    console.log("signUpBUser function [line 14]: ---", req.body);
    let existsUser = await BusinessUser.findOne({ userMail: bUser.userMail });
  if (existsUser) {
     console.log("This email already exists in the system", existsUser);
     res.send({ status: "errExist" });
  }
    const token = JWT.sign({ password: bUser.password }, process.env.SECRET);
    bUser.save().then((bUser) => {
        mailerFunc.sendmail("wellcom", bUser.userMail, bUser.name, null );
        res.send({id: bUser._id, name: bUser.name, mess:"success"})
    }).catch(err => {
        console.log("eror in add business user!" + err)
    })
}

//לוגין
const loginBUser = async (req, res) => {
  await console.log("loginBUser function [line 30]: ---", req.body);
  const bUser = BusinessUser.findOne({ userMail: req.body.userMail }).then(async (r, s) => {
    const pass = r.password;
    let v = await bcrypt.compareSync(req.body.password, pass);
    console.log(v);
    if (v) {
      res.send({id: r._id, name: r.name, mess:"success"})
    }
    else {
      res.send({mess: "err pass"});
    }
  }).catch(err=>res.send(err+"user not exsist!"));
}

//שליפת משתמש
// const showBUser = async(req, res) => {
//   console.log("showBUser function [line 48]:---", req.body);
//   let id;
//   req.body.bUser ? (id = req.body.bUser) : (id = req.body._id);
//     await BusinessUser.find({ _id: ObjectId(id) }).then((reqst, respns) => {
//         console.log("the bUser is: [line 52]:---", reqst);
//       if (req.body.bUser)
//         return (reqst);
//       else res.send(reqst);
//     })
//         .catch(err => console.log(err + "error in show bUser"));
// }

const showBUser = async (req, res) => {
  console.log("showBUser function [line 48]:---", req.body);
  let id;
  req.body.bUser ? (id = req.body.bUser) : (id = req.body._id);

  try {
    const user = await BusinessUser.find({ _id: ObjectId(id) });
    console.log("the bUser is: [line 52]:---", user);
    
    if (req.body.bUser)
      return user;
    else{
      res.send(user);}
  } catch (error) {
    res.send(error)
    console.log("Error in showBUser:", error);
    throw error; // Throw error to handle it in the calling function if needed
  }
   
};

//הוספת חדר התכתבות
const creatBChatRoom = async (messD) => {
  const lenD = messD.details.length-1;
  await BusinessUser.updateOne({ _id: messD.bUser }, { $push: { chatRoom: { idMessR: messD._id, pUserName: messD.pUserName, lastDate: messD.details[lenD].date } } })
    .then(() => {
      console.log("success add chat room to bUser");
  }).catch(err => console.log("error add chat room to bUser    ", err));
}

//הצגת כל בעלי המקצוע לפי תחום מקצוע
const showBUByProf = async (req, res) => {
  await BusinessUser.find({ profession: req.body.category })
    .then((business) => {
      console.log(business);
      res.send(business);
    })
    .catch((err) => res.status(400).send("Error: " + err));
}

//עדכון פרטי משתמש
// const updateBUser = async(req, res) => {
//   console.log("updateBUser function [line 77]:---", req.body);
//   if(req.body.name){
//     await BusinessUser.updateOne(
//       { _id: req.body.id },
//       { $set: { name: req.body.name } }
//     )
//       .then((reqst, respns) => {
//         console.log(reqst);
//       })
//       .catch(console.log("error update name"));
//   }
//   if(req.body.phone){
//     await BusinessUser.updateOne(
//       { _id: req.body.id },
//       { $set: { phone: req.body.phone } }
//     )
//       .then((reqst, respns) => {
//         console.log(reqst);
//       })
//       .catch(console.log("error update phone"));
//   }
//   if(req.body.userMail){
//     await BusinessUser.updateOne(
//       { _id: req.body.id },
//       { $set: { userMail: req.body.userMail } }
//     )
//       .then((reqst, respns) => {
//         console.log(reqst);
//       })
//       .catch((err) => console.log("error update mail     ", err));
//   }
//   res.send("success update buser!")
// }

// const updateBUser = async (req, res) => {
//   console.log("updateBUser function [line 136]: ", req.body);
//   const userId = req.body._id;
//   const updateData = req.body;

//   try {
//     let user = await BusinessUser.findById(userId);

//     // Exclude _id and password from the update
//     // Object.keys(updateData).forEach(async(key) => {
//     //   if (key !== "_id" && key !== "password") {
//     //     if (updateData[key] !== undefined && updateData[key] !== null) {
//           // user[key] = updateData[key];
//           await BusinessUser.updateOne({ _id: req.body.id },
//             Object.keys(updateData).forEach(async (key) => {
//               if (key !== "_id" && key !== "password") {
//                 if (updateData[key] !== undefined && updateData[key] !== null) {
//                   { { $set: { userMail: req.body.userMail } } }
//                 }
//               }
//             }))
      
        
//     //   }
//     // });

//     // Save the updated user
//     // await user.save();
//     res.send("User updated successfully");
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).send("Error updating user");
//   }
// };
const updateBUser = async (req, res) => {
  console.log("updateBUser function [line 136]: ", req.body);
  const userId = req.body._id;
  const updateData = req.body;

  try {
    // Construct the update object
    let updateFields = {};
    Object.keys(updateData).forEach((key) => {
      if (key !== "_id" && key !== "password") {
        if (updateData[key] !== undefined && updateData[key] !== null) {
          updateFields[key] = updateData[key];
        }
      }
    });

    // Use updateOne to update the document
    await BusinessUser.updateOne({ _id: userId }, { $set: updateFields });

    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
};



// // //צפיה בכל החיפושים
// // const showSearchs = (req, res) => {
// //     BUser.findById({ _id: req.params.id }).populate('history', ['city', 'temp'])
// //         .then((result) => {
// //             res.send(result)
// //         })
// //         .catch((err) => { console.log(`error in find your searches!: ${err}`) })
// // }


// // //מחיקת חיפוש
// // const deleteSearch = (req, res) => {
// //     Weather.findByIdAndDelete({ '_id': req.params.id }).then((weather) => {
// //         res.send("the weather deleted!");
// //         console.log(weather.BUserId);
// //         //BUser.findByIdAndUpdate(weather.BUserId, { $pull:{ 'history': req.params.id } })
// //     })
// //         .catch((err) => { console.log(`problem in delete weather!: ${err}`); })
// // }


// // העלאת תמונת פרופיל
// const uploadImgP=() =>{
//     app.get('/', (req, res) => {
//         businessBUser.find({}, (err, items) => {
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
  signUpBUser,
  loginBUser,
  showBUser,
  creatBChatRoom,
  showBUByProf,
  updateBUser /*, uploadImgP */,
};