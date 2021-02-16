const express = require('express');
const router = express.Router();
const { Advertisement } = require('../models/model');

router.post('/advertisement/new',async (req,res)=>{
    const advertisement = new Advertisement(req.body);
    try{
        await advertisement.save();
        res.send(advertisement);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;