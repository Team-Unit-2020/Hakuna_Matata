const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected")
});

const userSchema = new mongoose.Schema({
    id: 'string',
    name: 'string',
    email: 'string',
    phone: 'string',
    dob: 'string',
    address: 'string',
    password: 'string',
    nic: 'string',
    usertype: 'string',
    active: {
        type: Boolean,
        default: false
    },
    favourites: [String]
})

module.exports.User = mongoose.model('User', userSchema);

const confirmScema = new mongoose.Schema({
    id: 'string',
    accountId: 'string',
    expiresAt: 'string'
});

module.exports.ConfimUser = mongoose.model('ConfimUser', confirmScema);

const serviceProviderProfileSchema = new mongoose.Schema({
    id: 'string',
    name: 'string',
    email: 'string',
    address: 'string',
    mobilenumber:'string',
    aboutme: 'string',
    userId: 'string',
    profilepic:{
        data: Buffer,
        contentType: String
    }
})
module.exports.ServiceProviderProfile = mongoose.model('ServiceProviderProfile', serviceProviderProfileSchema);
const homeIconsSchema = new mongoose.Schema({
    id: 'string',
    name: 'string',
    icon: 'string',
    toolTip: 'string',
    isActive: {
        type: Boolean,
        default: false
    }
});
module.exports.HomeIcons = mongoose.model('HomeIcons', homeIconsSchema);

const advertisementsSchema = new mongoose.Schema({
    id: 'string',
    title: 'string',
    body: 'string',
    location: {
        text: { type: 'string' },
        lan: { type: mongoose.Schema.Types.Decimal128 },
        lat: { type: mongoose.Schema.Types.Decimal128 }
    },
    keywords: [String],
    images: [String],
    category: 'string',
    isActive: {
        type: Boolean,
        default: false
    },
    qty: 'number',
    price: 'number',
    serviceProvider: {
        id: 'string',
        name: 'string',
        phoneNumber: [String],
        address: 'string',
        memberSince: 'string',
        email: 'string'
    }
});

module.exports.Advertisements = mongoose.model('Ads', advertisementsSchema);

const orderSchema = new mongoose.Schema({
    id: 'string',
    title: 'string',
    body: 'string',
    advertisementId: 'string',
    serviceProvider: {
        name: 'string',
        phoneNumber: [String],
        memberSince: 'string',
        email: 'string'
    },
    item: {
        name: 'string',
        description: 'string',
        amount: 'string',
        isAccepted: {
            type: Boolean,
            default: false
        },
        payments: {
            paymentAmount: 'string',
            isPayed: {
                type: Boolean,
                default: false
            },
            isAdvancedPayed: {
                type: Boolean,
                default: false
            }
        }
    },
    serviceSeeker: {
        id: 'string',
        name: 'string',
        email: 'string',
        phone: 'string',
    }
})

module.exports.Orders = mongoose.model('Orders', orderSchema);