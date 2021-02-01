const express = require('express');
const router = express.Router();
const { Advertisement } = require('../models/model');

router.post('/advertisement/new',(req,res)=>{
    console.log('pooop')
})

module.exports = router;