const express = require('express');
const { startSession } = require('mongoose');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Advertisement, ServiceProviderProfile } = require('../models/model');

router.post('/advertisement/new',async (req,res)=>{
    var id = uuidv4();
    const advertisement = new Advertisement({
        id: id,
        name: req.body.productname,
        description: req.body.productdescription,
        catergory: req.body.productcategory,
        availableQty: req.body.productavailableqty,
        price: req.body.productprice,
        serviceProviderId: req.body.productavailableqty
    });
   
    advertisement.save((err)=>{
        if(err) res.json({status:500 , message: "Something went wrong"});
        res.send(advertisement);
    });
})

router.get('/advertisement/all',(req,res)=>{
    Advertisement.find({},(err,ads)=>{
        if(err){
            res.json({status:500, message:"Something went wrong"})
        }
        else{
            res.json({status:200, message:"", body: ads});
        }
    })
})

router.post('/profile/new',(req,res)=>{
    var id = uuidv4();
    var profile = new ServiceProviderProfile({
        id: id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        mobilenumber: req.body.mobilenumber,
        aboutme: req.body.aboutme,
        userId: req.body.userId,
        profilepic:{
            data: req.body.profileimage,
            contentType: 'image/*'
        }
    });
    profile.save((err)=>{
        if(err) res.json({status:500 , message: "Something went wrong"});
        else res.json({status:200 , message: "Successful", body: profile});
    });
})

module.exports = router;