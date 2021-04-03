const { Orders, Advertisements, User } = require("../models/model");
const { v4: uuidv4 } = require('uuid');

module.exports.sendOrder = async (order) => {
    var advertisement = await Advertisements.findOne({ id: order.service });
    var user = await User.findOne({ id: order.user });

    var newOrder = new Orders({
        id: uuidv4(),
        title: order.title,
        body: order.body,
        advertisementId: order.service,
        serviceProvider: advertisement.serviceProvider,
        item: {
            name: advertisement.title,
            description: advertisement.body,
            amount: '0.0',
            isAccepted: false
        },
        serviceSeeker: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
    });

    let doc = await newOrder.save();
    
    if (!doc)
        return false;

    return true;
}