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

module.exports = router;