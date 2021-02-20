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
    active: {
        type: Boolean,
        default: false
    }
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

const advertisementScema = new mongoose.Schema({
    id: 'string',
    name: 'string',
    description:'string',
    catergory:'string',
    availableQty: 'number',
    price: 'number',
    serviceProviderId: 'string'
    
});

module.exports.Advertisement = mongoose.model('Advertisement', advertisementScema);