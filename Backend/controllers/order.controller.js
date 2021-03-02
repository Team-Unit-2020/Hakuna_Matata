const express = require('express');
const router = express.Router();
const { sendOrder } = require('../services/orderService');

router.post("/send", async (req, res) => {
    let response = await sendOrder(req.body);

    if (!response)
        return res.json({ status: 500, message: "Something went wrong!" });

    res.json({ status: 200, message: "Order request sent!" })
})

module.exports = router;