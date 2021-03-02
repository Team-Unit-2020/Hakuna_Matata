require('dotenv').config()
const express = require("express");
var axios = require("axios");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
var cors = require("cors");
const passport = require('passport');
require('./services/authService');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoute = require('./controllers/auth.controller');
const profileRoute = require('./controllers/profile.controller');
const serviceProviderRoute = require('./controllers/serviceprovider.controller');
const dynamicRoute = require('./controllers/dynamic.controller');
const adsRoute = require('./controllers/advertisement.controller');
const orderRoute = require('./controllers/order.controller');

app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), profileRoute);
app.use('/service-provider', serviceProviderRoute);
app.use('/service-provider/services', adsRoute);
app.use('/dynamic', dynamicRoute);
app.use('/order', passport.authenticate('jwt', {session: false}), orderRoute);

app.listen(port, function () {  
    console.log("Listening to Port " + port);
});