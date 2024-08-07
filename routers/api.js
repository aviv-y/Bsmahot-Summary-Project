const router = require('express').Router()

const pUser = require("../controllers/PrivetUser.controller");
const bUser = require("../controllers/BusinessUser.controller");
const prfsn = require("../controllers/Profession.controller");
const sPrfsn = require("../controllers/SubProfession.controller");
const remark = require("../controllers/Remarks.controller");
const event = require("../controllers/Event.controller");
const notice = require("../controllers/Notice.controller");
const contract = require("../controllers/Contract.controller");
const Image = require('../controllers/Image.controller')

/** Privet User **/
// router.get('/hello', pUser.hello);
router.post('/signUpPUser', pUser.signUpPUser);
router.post('/loginPUser', pUser.loginPUser);
router.post('/reqResetPass', pUser.requestResetPassword);
router.post('/resetPass', pUser.resetPassword);
router.post('/showPUser', pUser.showPUser);
router.post('/updatePUser', pUser.updatePUser);
router.post('/creatChatRoom', pUser.creatChatRoom);

/** Business User **/
router.post('/signUpBUser', bUser.signUpBUser);
router.post('/loginBUser', bUser.loginBUser);
router.post('/showBUser', bUser.showBUser);
router.post('/creatBChatRoom', bUser.creatBChatRoom);
router.post('/showBUByProf', bUser.showBUByProf);
router.post('/updateBUser', bUser.updateBUser);


/** Professions **/
router.post('/addProfession', prfsn.addProfession);
router.post('/showAllProfession', prfsn.showAllProfession);

/** Sub Professions **/
router.post('/addSProfession', sPrfsn.addSProfession);
router.post('/showSubProfession', sPrfsn.showSubProfession);

/** Remark **/
router.post('/addRemark', remark.addRemark);
router.post("/sendReminder", remark.sendReminder);
router.post("/showRemarkByBUserId", remark.showRemarkByBUserId);

/** Event **/
router.post('/newEvent', event.newEvent);
router.post('/sendMess', event.sendMess);
router.post('/commentMess', event.commentMess);
router.post('/showMess', event.showMess);
router.post("/showChatR", event.showChatR);
router.post("/showEvents", event.showEvents);
router.post("/showEventById", event.showEventById);
router.post("/updateEvent", event.updateEvent);

/** Notice **/
router.post('/addNotice', notice.addNotice);

/** Contract **/
router.post('/addContract', contract.addContract);
router.post("/sendAttachment", contract.sendAttachment);
router.post("/showContract", contract.showContract);
router.post("/updateContract", contract.updateContract);
router.post("/showContractByIdEvent", contract.showContractByIdEvent);
router.post("/showAllContracts", contract.showAllContracts);

/** Image **/
// router.post('/addImage', image.addImage);
router.post("/upload-image", Image.uploadImg);
router.post("/getImagesByIdUser", Image.getImagesByIdUser);


module.exports = router