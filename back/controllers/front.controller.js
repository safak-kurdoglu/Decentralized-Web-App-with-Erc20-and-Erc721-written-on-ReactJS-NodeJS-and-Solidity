const NFTsModel = require('../models/NFTs.model');
const shilaPointsModel = require('../models/ShilaPoints.model');
const NFTsOnSaleModel = require('../models/NFTsOnSale.model');
const NFTsInFightModel = require('../models/NFTsInFight.model');
const shilaRequestModel = require('../models/WaitingShilaRequests.model');
const waitingNFTRewardsModel = require('../models/WaitingNFTRewards.model');
  

async function registerNewNFT(req, res){

    try {
        const user = await shilaPointsModel.findOne({address: req.body.address}).exec();
        var point;
        if(!user){
            point = 1;
        }else{
            point = user.point === 0 ? 1 : user.point;
            user.point = 0;
            user.save();
        }

        const power = 100 + Math.log(point) * (Math.random() * 10 + 100);

        const newNFT = new NFTsModel({
            NFTid: req.body.NFTId,
            name : req.body.NFTName,
            image : req.body.NFTImage,
            power: power
        });
        await newNFT.save();
         
        res.json({status: true, message: "NFT registered successfully."});
    } catch(error){ 

       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function fightNFT(req, res){ 

    try{
        const NFTsWaitingOpponent = await NFTsInFightModel.find();
        if(!(NFTsWaitingOpponent.length)){
            const NFT = await NFTsModel.findOne({NFTid: req.body.NFTId}).exec();
            new NFTsInFightModel({
                NFTid: NFT.NFTid,
                name: NFT.name,
                image: NFT.image,
                power: NFT.power,
                exOwner: req.body.owner
            }).save();
            res.json({status: true, message: "Your NFT is waiting opponent."});
        }
        else{
            const NFTIdF = NFTsWaitingOpponent[0].NFTid;
            await NFTsInFightModel.findOne({NFTid: NFTIdF}).remove();
            const NFTIdS = req.body.NFTId;

            const NFTF = NFTsModel.findOne({NFTid: NFTIdF}).exec();
            const NFTS = NFTsModel.findOne({NFTid: NFTIdS}).exec();
            const powerF = NFTF.power;
            const powerS = NFTS.power;
            const ownerF = NFTsWaitingOpponent[0].exOwner;
            const ownerS = req.body.owner;

            const randomNumber = Math.random();
 
            const marginF = Math.log(powerF);
            const marginS = Math.log(powerS);
            const probabilityF = marginF / (marginF + marginS);

            if(randomNumber < probabilityF){
                new waitingNFTRewardsModel({
                    NFTidF: NFTIdF,
                    NFTidS: NFTIdS,
                    ownerToSend: ownerF
                }).save();

                res.json({status: true, message: "You lost."});

            } else{
                new waitingNFTRewardsModel({
                    NFTidF: NFTIdF,
                    NFTidS: NFTIdS,
                    ownerToSend: ownerS
                }).save();

                res.json({status: true, message: "You win the game."});
            }
        }
    }  
    catch(error){

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function saveNFTImage(req, res){ 

    try{
        res.json({status: true});
    }  
    catch(error){

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function getWaitingNFT(req, res){ 

    try{
        const NFTWaitingOpponent = await NFTsInFightModel.findOne({exOwner: req.body.owner}).exec();
        if(NFTWaitingOpponent){
            res.json({status: true, NFTWaitingOpponent});
        }
        else{
            res.json({status: true}); 
        }
    }  
    catch(error){
  
        res.json({status: false, message: "Something went wrong.", error});
    }
}
 
async function getWaitingRewards(req, res){ 

    try{
        const NFTsWaitingToBeRewarded = await waitingNFTRewardsModel.find({ownerToSend: req.body.owner});
        const len = NFTsWaitingToBeRewarded.length;
        const message = len ? "Your waiting rewards  : " + (len*2) + " NFT and " + (len*0.19) + " Ethereum." : "Your waiting rewards : non";
        res.json({status: true, message});        
    }  
    catch(error){

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function getWaitingRewardsToSend(req, res){ 

    try{
        const NFTsWaitingToSend = await waitingNFTRewardsModel.findOne().exec();
        if(NFTsWaitingToSend){
            NFTsWaitingToSend.remove();
            res.json({status: true, NFTsWaitingToSend});
        }else{
            res.json({status: true, message: "There are no waiting rewards."});
        }
    }  
    catch(error){

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function showNFTs(req, res){

    try { 
        const NFTs = await NFTsModel.find();
        const userNFTIds = req.body.Ids;
        var userNFTs = [];
        const len = userNFTIds.length;
        for(i=0; i<len; i++){
            userNFTs.push(NFTs.find((NFT) => NFT.NFTid == userNFTIds[i]));
        }

        res.json({status: true, userNFTs});
    } catch(error){ 

       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function finishSale(req, res){

    try {
        await NFTsOnSaleModel.findOne({NFTid: req.body.NFTId}).remove();

        res.json({status: true}); 
    } catch(error){  

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function sellNFT(req, res){

    try {
        const NFT = await NFTsModel.findOne({NFTid: req.body.NFTId}).exec();
        const newNFTOnSale = new NFTsOnSaleModel({
            NFTid: req.body.NFTId,
            name:  NFT.name,
            image : NFT.image,
            power: NFT.power,
            price: req.body.price
        });
        newNFTOnSale.save();

        res.json({status: true}); 
    } catch(error){  

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function getShilaPoint(req, res){

    try {
        const user = await shilaPointsModel.findOne({address: req.body.address}).exec(); 
        var amount; 
        if(user)
            amount = user.point; 
        else
            amount = 0;

        res.json({status: true, amount}); 
    } catch(error){  

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function updateShilaPoint(req, res){

    try { 
        const user = await shilaPointsModel.findOne({address: req.body.address}).exec();
        if(user){
            user.point += req.body.point;
            user.save();
        }else{
            new shilaPointsModel({ 
                address: req.body.address,
                point: req.body.point
            }).save();
        }

        res.json({status: true, message: "Shila point is updated."});
    } catch(error){ 

       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function requestShilaCoin(req, res){

    try { 
        var user = await shilaPointsModel.findOne({address: req.body.address}).exec();
        if(!user || !user.point){
            res.json({status: true, message: "You don't have Shila Point."});

        }else{
            const point = user.point;

            user.point = 0;
            user.save(); 

            user = await shilaRequestModel.findOne({address: req.body.address}).exec();
        
            if(user){
                user.shilaPoint += point;
                user.save();
            }else{
                new shilaRequestModel({ 
                    address: req.body.address,
                    shilaPoint: point
                }).save();
            }

            res.json({status: true, message: "Shila point is updated."});
        }
    } catch(error){ 

       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function approveRequest(req, res){

    try { 
        const users = await shilaRequestModel.find();

        if(users.length){
            const user = users[0];
            const point = user.shilaPoint
            const address = user.address;
            user.remove();

            res.json({status: true, point, address});
        }else{

            res.json({status: false, message: "There are no request waiting."});
        }
    } catch(error){ 

       res.json({status: false, message: "Something went wrong.", error});
    }
}

async function getNFTsOnSale(req, res){

    try{
        const NFTsOnSale = await NFTsOnSaleModel.find();

        res.json({status: true, NFTsOnSale});
    }  
    catch(error){

        res.json({status: false, message: "Something went wrong.", error});
    }
}

async function getNFTOnSale(req, res){ 

    try{
        const NFTOnSale = await NFTsOnSaleModel.findOne({NFTid: req.body.NFTId}).exec();

        res.json({NFTOnSale});
    }  
    catch(error){

        res.json({status: false, message: "Something went wrong.", error});
    }
}


module.exports = {
    getShilaPoint,
    updateShilaPoint,
    requestShilaCoin,
    approveRequest,
    getNFTsOnSale,
    registerNewNFT,
    sellNFT,
    showNFTs,
    fightNFT,
    getWaitingNFT,
    saveNFTImage,
    getNFTOnSale,
    getWaitingRewards,
    finishSale,
    getWaitingRewardsToSend
}