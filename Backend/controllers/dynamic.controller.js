const express = require('express');
const router = express.Router();
const { HomeIcons } = require('../models/model');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    HomeIcons.find({ isActive: true }, (err, data) => {
        if (err) return res.json({ status: 503, message: "Something went wrong" });

        return res.json({ status: 200, data: data });
    })
})

router.post('/homeicons/add', (req, res) => {
    const homeIcons = new HomeIcons({
        id: uuidv4(),
        name: req.body.name,
        icon: req.body.icon,
        toolTip: req.body.tip,
        isActive: true
    });

    homeIcons.save((err) =>{
        if (err) res.json({ status: 503, message: "Something went wrong!" });

        res.json({ status: 200, message: "Icon Added" });
    })
})

module.exports = router;