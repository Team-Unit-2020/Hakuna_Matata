const express = require('express');
const router = express.Router();
const { getAllAdvertisements,
    addNewAdvertisement,
    searchServices,
    getAdvertismentById,
    searchBasedOnLocation,
    searchByCategoryAndLocation,
    addToFavourites, getFavouritesByUser } = require('../services/advertisementService')

router.get("/all", (req, res) => {
    getAllAdvertisements().then(ads => {
        if (!ads) return res.json({ status: 204, message: "No any Ads available" });

        res.json({ status: 200, ads: ads })
    })
});

router.get("/search/:query", (req, res) => {
    let words = req.params.query.split(" ");
    searchServices(words);
    res.send("Done")
})

router.get("/id/:id", (req, res) => {
    getAdvertismentById(req.params.id).then(ad => {
        if (!ad) res.json({ status: 204, message: "No any Ad available" });

        res.json({ status: 200, ad: ad });

    }).catch(err => {
        return res.json({ status: 500, message: err.message });
    })
});

router.get("/write", (req, res) => {
    addNewAdvertisement();
    res.send("done")
})

router.get("/search/byLocation/:location", async (req, res) => {
    let advertsByLocation = await searchBasedOnLocation(req.params.location);

    if (!advertsByLocation) res.json({ status: 204, message: "No any Ad available" });

    res.json({ status: 200, ads: advertsByLocation });
})

router.get("/search/byCategoryAndLocation/:category/:location", async (req, res) => {
    let advertsByLocation = await searchByCategoryAndLocation(req.params.category, req.params.location);

    if (!advertsByLocation) res.json({ status: 204, message: "No any Ad available" });

    res.json({ status: 200, ads: advertsByLocation });
})

router.get("/add/favourites/user/:userId/ad/:adId", async (req, res) => {
    let isSuccess = await addToFavourites(req.params.userId, req.params.adId);

    if (!isSuccess) res.json({ status: 500, message: "Operation Failed" });

    res.json({ status: 200, message: "Added to Favourites Successfully!" })
})

router.get("/favourites/user/:userId", async (req, res) => {
    let favouriteAds = await getFavouritesByUser(req.params.userId);

    if (!favouriteAds) res.json({ status: 500, message: "No any favourite ads!" });

    res.json({ status: 200, favouriteAds: favouriteAds })
})

module.exports = router;