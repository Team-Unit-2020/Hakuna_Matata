const { model } = require("mongoose");
const { Advertisements, User } = require("../models/model");

module.exports.getAllAdvertisements = async () => new Promise((resolve, reject) => {
    Advertisements.find({}).then(ads => {
        resolve(ads)
    }).catch(err => {
        reject(err)
    })
})

module.exports.addNewAdvertisement = async () => new Promise((resolve, reject) => {
    const data = require('../ads.json');

    data.forEach(x => {
        const ad = new Advertisements(x);
        ad.save();
    })

    resolve(true);
})

module.exports.getAdvertismentById = async (id) => new Promise((resolve, reject) => {
    Advertisements.findOne({ id: id }).then(ad => {
        resolve(ad)
    }).catch(err => {
        reject(err)
    })
})

module.exports.searchServices = async (query) => new Promise((resolve, reject) => {

    words.forEach(word => {
        Advertisements.find({ keywords: word }).then(docs => {
            console.log(docs)
        })
    })

    resolve(true)
})

module.exports.searchBasedOnLocation = async (location) => {
    let advertisements = await Advertisements.find({ "location.text": { $regex: location, $options: 'i' } });
    return advertisements;
}

module.exports.searchByCategoryAndLocation = async (category, location) => {
    let advertisements = await Advertisements.find({ "category": { $regex: category, $options: 'i' }, "location.text": { $regex: location, $options: 'i' } });
    return advertisements;
}

module.exports.addToFavourites = async (userId, adId) => {
    let user = await User.findOne({ id: userId });
    let favourites = user.favourites;

    if (!favourites.find(adId)) {
        favourites.push(adId)
        user.favourites = favourites;
    }
    let isSuccess = await user.save();

    if (!isSuccess) return false;

    return true;
}