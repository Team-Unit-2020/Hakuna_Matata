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
    Advertisements.findOne({ id: id }).lean().then(async ad => {
        const serviceProviderId = ad.serviceProvider.id;
        const sp = await User.findOne({id: serviceProviderId});
        resolve({
            ...ad,
            serviceProvider: {
                id: serviceProviderId,
                phoneNumber: [
                    sp.phone
                ],
                email: sp.email
            }
        })
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

    if (!favourites.find(e => e === adId)) {
        favourites.push(adId)
        user.favourites = favourites;
        let isSuccess = await user.save();
        if (!isSuccess) return false;
        return true;
    } else {
        return false
    }
}

module.exports.getFavouritesByUser = async (userId) => {
    let user = await User.findOne({ id: userId });
    let favouriteAdIds = user.favourites;
    let advertisements = await Advertisements.find({ id: favouriteAdIds });
    return advertisements;
}

module.exports.removeFavourite = async (userId, adId) => {
    let user = await User.findOne({ id: userId });
    let favouriteAdIds = user.favourites;
    let newFavourites = favouriteAdIds.filter(element => element !== adId);
    user.favourites = newFavourites;
    let isSuccess = await user.save();

    if (!isSuccess) return false;

    return true;
}