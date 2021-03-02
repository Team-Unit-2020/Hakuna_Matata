const express = require('express');
const { User } = require('../models/model');
const router = express.Router();

router.get("/:id", (req, res) => {
    if (!req.params.id) return res.json({ status: 503, message: "User Not found" });
    User.findOne({ id: req.params.id }, (err, user) => {
        if (err) return res.json({ status: 503, message: "User Not found" });

        if (user) {
            var user = {
                id: user.id,
                name: user.name,
                email: user.email,
                nic: user.nic,
                phone: user.phone,
                address: user.address,
                dob: user.dob,
                active: user.active
            };
        }

        return res.json({ status: 200, user: user });
    })
})
outer.put("/edit/profile/:id", (req, res) => {

    if (!req.params.id) return res.json({ status: 503, message: "Invalid Request" });

    var query = { id: req.params.id };
    var updates = {
        name: req.body.name,
        nic: req.body.nic,
        phone: req.body.phone,
        address: req.body.address,
        dob: req.body.dob
    }
    User.updateOne(query, updates, (err, user) => {
        if (err) return res.json({ status: 503, message: "Profile update failed" });

        if(user){
            return res.json({ status: 200, user: user })
        }
    })

})

router.get("/account/deactivation/:id", (req, res) => {
    if (!req.params.id) return res.json({ status: 503, message: "Invalid Request" });

    User.updateOne({ id: req.params.id }, { active: false }, (err, user) => {
        if (err) return res.json({ status: 503, message: "Cannot Deactivate account" });

        if(user){
            return res.json({ status: 200, active: false })
        }
    })
})

module.exports = router;