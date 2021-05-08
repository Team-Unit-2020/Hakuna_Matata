const express = require('express');
const router = express.Router();
const { sendOrder, getOrdersById, getOrdersByUser } = require('../services/orderService');

router.post("/send", async (req, res) => {
    let response = await sendOrder(req.body);

    if (!response)
        return res.json({ status: 500, message: "Something went wrong!" });

    res.json({ status: 200, message: "Order request sent!" })
})

router.get("/byUser/:userId", async (req, res) => {

    let response = await getOrdersByUser(req.params.userId);

    if (!response)
        return res.json({ status: 500, message: "Something went wrong!" });

    res.json({ status: 200, orders: response })
})

router.get("/byId/:orderId", async (req, res) => {

    let response = await getOrdersById(req.params.orderId);

    if (!response)
        return res.json({ status: 500, message: "Something went wrong!" });

    res.json({ status: 200, order: response })
})

module.exports = router;