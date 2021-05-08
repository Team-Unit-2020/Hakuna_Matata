const express = require('express');
const { startSession, Mongoose } = require('mongoose');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Advertisements, ServiceProviderProfile } = require('../models/model');


router.post('/advertisement/new',async (req,res)=>{
    var id = uuidv4();
    const advertisement = new Advertisements({
        id: id,
        title: req.body.productname,
        body: req.body.productdescription,
        category: req.body.productcategory,
        qty: req.body.productavailableqty,
        price: req.body.productprice,
        serviceProvider:{
            id: req.body.productavailableqty
        },
        images: [req.body.images],
        location: {
            text: req.body.location,
            lan: 79.861244,
            lat: 6.927079
        }
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

    let profileFind = ServiceProviderProfile.find({userId: req.body.userId})
    if (profileFind){
        throw("already has")
    }
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


router.get('/profile/',(req,res)=>{
    console.log(req.query)
    ServiceProviderProfile.find({userId: req.query.id},(err,ads)=>{
        if(err){
            res.json({status:500, message:"Something went wrong"})
        }
        else{
            res.json({status:200, message:"", body: ads});
        }
    })
})


router.post('/profiless/update',(req,res)=>{
    // var id = uuidv4();
    console.log("update profile")
    console.log(req.body)
    // let profileFind = ServiceProviderProfile.findOne({id: req.body.id})

    // profileFind.overWrite({
    //     name: req.body.name,
    //     email: req.body.email,
    //     address: req.body.address,
    //     mobilenumber: req.body.mobilenumber,
    //     aboutme: req.body.aboutme,
    //     userId: req.body.userId,
    //     profilepic:{
    //         data: req.body.profileimage,
    //         contentType: 'image/*'
    //     }
    // })

    var ObjectId = require('mongodb').ObjectID;

    var profile = {
        // _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        mobilenumber: req.body.mobilenumber,
        aboutme: req.body.aboutme,
        // userId: req.body.userId,
        // profilepic:{
        //     data: req.body.profileimage,
        //     contentType: 'image/*'
        // }
    }

    ServiceProviderProfile.replaceOne({"id": req.body.id.replace(/^\s+|\s+$/g, '')}, profile, function(err, results){
        if(err){console.log(err)}
        else{
            console.log(results);
            res.json(req.body)
        }
     })

    // ServiceProviderProfile.findOneAndUpdate({})

    // var profile = new ServiceProviderProfile({
        
    //     _id: req.body.id,
    //     name: req.body.name,
    //     email: req.body.email,
    //     address: req.body.address,
    //     mobilenumber: req.body.mobilenumber,
    //     aboutme: req.body.aboutme,
    //     userId: req.body.userId,
    //     profilepic:{
    //         data: req.body.profileimage,
    //         contentType: 'image/*'
    //     }
    // });

    // var id = req.body.id
    // try{
    //     console.log("sdsdds")
    //     profile.replaceOne({ id }, {name:"Anuj"});
    // }catch(e){
    //     console.log(e)
    // }
    
    // try{
    //     profile.replaceOne((err)=>{
    //         console.log(err)
    //         if(err) res.json({status:500 , message: "Something went wrong"});
    //         else res.json({status:200 , message: "Successful", body: profile});
    //     });
    // }catch(e){
    //     console.log(e)
    // }

    // profileFind.save((err)=>{
    //     if(err) res.json({status:500 , message: "Something went wrong"});
    //     else res.json({status:200 , message: "Successful", body: profile});
    // });

})

module.exports = router;