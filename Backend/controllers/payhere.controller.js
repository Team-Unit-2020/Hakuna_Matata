const express = require('express');
const router = express.Router();
const { confirmPayment } = require('../services/payhereService')

router.post("/notify", async (req, res) => {
    const isPaymentSuccess = await confirmPayment(req.body);

    if (!isPaymentSuccess)
        return res.json({ status: 503, message: "Payment unsuccessful" });

    return res.json({ status: 200, message: "Payment Confirmed!" });

})

module.exports = router;