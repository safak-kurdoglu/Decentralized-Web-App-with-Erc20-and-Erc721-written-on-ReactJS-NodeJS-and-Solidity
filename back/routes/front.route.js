const route = require('express').Router();
const front_controller = require('../controllers/front.controller');
const multer = require('multer')
const middleware = require('../middlewares/auth.middleware')

route.post('/update-shila-point', middleware.verifyShilaPointRequest, front_controller.updateShilaPoint);
route.post('/get-shila-point', front_controller.getShilaPoint);
route.post('/request-shila-coin', front_controller.requestShilaCoin);
route.post('/get-NFT-on-sale', front_controller.getNFTOnSale);
route.post('/register-new-nft', front_controller.registerNewNFT);
route.post('/put-NFT-to-sale', front_controller.sellNFT);
route.post('/del-NFT-from-sale', front_controller.finishSale);
route.post('/show-NFTs', front_controller.showNFTs);
route.post('/put-NFT-to-fight', front_controller.fightNFT);
route.post('/get-waiting-NFT', front_controller.getWaitingNFT);
route.post('/get-waiting-rewards', front_controller.getWaitingRewards);
route.get('/approve-request', front_controller.approveRequest);
route.get('/get-NFTs-on-sale', front_controller.getNFTsOnSale);
route.get('/get-waiting-rewards-to-send', front_controller.getWaitingRewardsToSend);
 
 
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../front/client/public')  
    }, 
    filename: (req, file,  callBack) => { 
        callBack(null, file.fieldname + '-' + file.originalname)
    }
})
  
var upload = multer({
    storage: storage
});

route.post('/save-NFT-image' ,upload.single('image'), front_controller.saveNFTImage);


module.exports = route;     