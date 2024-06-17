const Contracts = require('../models/contract.model')
const mailerFunc = require("../utils/mailerFunc");
const multer = require("multer");
const generatePDF = require('../pdfMake/pdfFile')
const {showBUser} = require('./BusinessUser.controller')
const PrivetUser = require("../models/privetUser.model");
const ObjectId = require("mongodb").ObjectID;
const Events = require("../models/events.model");
const scheduleEmail = require("../utils/maileSchedule");

// הוספת חוזה      
const addContract = (req, res) => {
    const contract = new Contracts(req)
    contract.save().then(() => {
        console.log("addContract function success! [line 14]");
    }).catch(err => {
        console.log("eror in add contract! "+err)
    })
}

const updateContractDetails = async (c, id) => {
  console.log(c);
  try {
    const result = await Contracts.updateOne(
      { _id: id },
      { $set: { contractValue: c.contractValue } }
    );
    // console.log(result);
    if (result.modifiedCount === 0) {
      console.log("No documents matched the query to update.");
    } else {
      console.log("Document updated successfully.");
    }
    return result;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error; // Re-throw the error to handle it at a higher level
  }
};



const sendAttachment = async (req, res) => {
    console.log("sendAttachment function [line 20]:---", req.body);
    await PrivetUser.find({ _id: ObjectId(req.body.toId) }).then((reqst, respns) => {
        console.log("user result [line 22]:---", reqst)
        generatePDF(req.body.pdfValue).then((attachment) => {
            const contract = {
                pUser: req.body.toId,
                bUser: req.body.user,
                contractValue: req.body.pdfValue,
                signaPU: 0,
              token: req.body.token,
                event: req.body.event
          }
          if (req.body.isUpdate) {
            updateContractDetails(contract, req.body.isUpdate);
          }
          else  addContract(contract)
        mailerFunc.sendmail(
          "attachment",
          reqst[0].userMail,
          req.body.name,
          req.body.token,
          reqst[0].name,
          attachment
        );
        res.send("success send attachment");
    })});
};


async function showContract (req, res){
  console.log("showContract function [line 49]:---", req.body);
  await Contracts.find({ token: req.body.token }).then((reqst, respns) => {
    // console.log("contract result [line 51]:---", reqst);
    res.send(reqst);
  })
  .catch(err=>console.log("error in show contract [line 55]:---",err))
} 

const showContractByIdEvent = async (req, res) => {
  console.log("showContractByIdEvent function [line 56]:---", req.body);
   await Contracts.findOne({ event: ObjectId(req.body.idEvent) }).then((e) => {
    // console.log(e);
    res.send(e);
  });
}

// const updateContract = async (req, res) => {
//   let eventDetails;
//   console.log("updateContract function [line 91]:---", req.body);

//   await Events.findOne({ _id: ObjectId(req.body.event) })
//     .populate("pUser", "name userMail") // Populate pUser with name and email fields
//     .populate({
//       path: "closeBUser",
//       match: { _id: new ObjectId(req.body.bUser) }, // Filter by the ObjectId
//       select: "name userMail", // Select the name and email fields
//     })
//     .exec(function (err, events) {
//       eventDetails = events;
//       if (err) {
//         console.error(err);
//         return;
//       }
//     });
        
//     await Contracts.updateOne(
//       { _id: req.body._id },
//       { $set: req.body }
//     )
//       .then(() => {
        
//         generatePDF(req.body.contractValue).then((attachment) => {
//           eventDetails.attachment = attachment;
//            mailerFunc.sendmail(
//              "signAttachment",
//              eventDetails.closeBUser[0].userMail,
//              eventDetails.closeBUser[0].name,
//              req.body.token,
//              req.body.namePU,
//              attachment
//            ); 
//         })
//           ;
//         console.log("-----------------------------", eventDetails);
//         scheduleEmail.scheduleEmail(eventDetails);
//           res.send("success send attachment");
//       })
//       .catch(err=>console.log("error update contract  [line 131]", err));

// }
const updateContract = async (req, res) => {
  console.log(req.body);
  try {
    const eventDetails = await Events.findOne({ _id: ObjectId(req.body.event) })
      .populate("pUser", "name userMail")
      .populate({
        path: "closeBUser",
        match: { _id: new ObjectId(req.body.bUser) },
        select: "name userMail",
      })
    .exec();
      console.log(eventDetails);

    if (!eventDetails) {
      console.log("Event not found");
      return res.status(404).send("Event not found");
    }

    await Contracts.updateOne({ _id: req.body._id }, { $set: req.body });

    const attachment = await generatePDF(req.body.contractValue);
    eventDetails.attachment = attachment;
    await mailerFunc.sendmail(
      "signAttachment",
      eventDetails.closeBUser[0].userMail,
      eventDetails.closeBUser[0].name,
      req.body.token,
      req.body.namePU,
      attachment
    );
    scheduleEmail.scheduleEmail(eventDetails);
    res.send("success send attachment");
  } catch (err) {
    console.error("Error updating contract:", err);
    res.status(500).send("Internal server error");
  }
};

// const showAllContracts = async (req, res) => {
//   console.log(req.body);
//   const userType = req.body.userType ? "bUser" : "pUser";
//   console.log(userType);
//   const allContract = await Contracts.find({ userType: ObjectId(req.body.userId) });
//   console.log(allContract);
//   res.send(allContract);
// }


const showAllContracts = async (req, res) => {
  try {
    console.log("showAllContracts function [line 182]: ",req.body);
    const userTypeField = req.body.userType ? "bUser" : "pUser";
    console.log(userTypeField);

    const query = {};
    query[userTypeField] = ObjectId(req.body.userId);

    const allContract = await Contracts.find(query);
    console.log(allContract);

    res.send(allContract);
  } catch (error) {
    console.error("Error fetching contracts:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching contracts." });
  }
};


module.exports = {
  addContract,
  showContractByIdEvent,
  sendAttachment,
  showContract,
  updateContract,
  showAllContracts,
};