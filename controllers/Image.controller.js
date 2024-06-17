const Images = require('../models/images.model');
const ObjectId = require("mongodb").ObjectID;

// const uploadImg =async(req, res)=>{ 
//   console.log(req.body)
//   try
//   {
//       const image = new Images(req.body);
//       await image
//         .save()
//         .then(() => {
//           res.send("success add img!");
//         })
//         .catch((err) => {
//           console.log("eror in add profession!" + err);
//         });
//   }
//   catch (error) {
//     res.send({Status: "error", data: error});
//   }
// }
const uploadImg = async (req, res) => {
  console.log("uploadImg function [line 23]: ", req.body);
  try {
    const { pUser } = req.body;

    // Find and delete the existing image with imageType: false and the same pUser
    const existingImage = await Images.findOneAndDelete({
      pUser: ObjectId(pUser),
      imageType: false,
    });

    let deletedImageName = null;
    if (existingImage) {
      console.log("Existing image deleted:", existingImage);
      deletedImageName = existingImage.image; // Capture the deleted image name
    } else {
      console.log(
        "No existing image found with imageType: false for the given pUser."
      );
    }

    // Save the new image
    const image = new Images(req.body);
    await image
      .save()
      .then(() => {
        res.send({
          message: "Success! Image added.",
          deletedImageName: deletedImageName, // Send the name of the deleted image
        });
      })
      .catch((err) => {
        console.log("Error in adding image:", err);
        res.status(500).send("Error in adding image.");
      });
  } catch (error) {
    console.log("Error in uploadImg function:", error);
    res.status(500).send({ status: "error", data: error });
  }
};

module.exports = uploadImg;

const getImagesByIdUser = async (req, res) => {
  let imgT;
  req.body.isProfile ? imgT = 0 : imgT = 1;
  console.log("getImagesByIdUser function [line 68]: ",req.body)
  await Images.find({ pUser: ObjectId(req.body.idUser), imageType: imgT })
    .then((reqst, respns) => {
      console.log(reqst);
      res.send(reqst);
      // console.log(reqst);
    })
    .catch((err) => console.log(err + "error in show images for this pUser"));
};

module.exports = {
  uploadImg,
  getImagesByIdUser,
};