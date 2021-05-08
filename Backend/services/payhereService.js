const { Orders } = require("../models/model");

module.exports.confirmPayment = async (paymentDetails) => {
    if (paymentDetails && paymentDetails.status_code === "2") {
        const order = await Orders.findOne({ id: paymentDetails.order_id });

        var query = { id: paymentDetails.order_id };
        var updates = {
            "item.payments.isPayed": parseInt(order.item.amount) === parseInt(paymentDetails.payhere_amount),
            "item.payments.isAdvancedPayed": parseInt(order.item.amount) > parseInt(paymentDetails.payhere_amount),
            "item.payments.paymentAmount": paymentDetails.payhere_amount,
            "item.amount": ((parseInt(order.item.amount) > parseInt(paymentDetails.payhere_amount)) ? (parseInt(order.item.amount) - parseInt(paymentDetails.payhere_amount)) : 0).toString()
        }

        Orders.updateOne(query, updates, (err, order) => {
            if (err) return false;

            if (order) return true;
        })

    }

    return false;


}