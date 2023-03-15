const express = require("express");
const router = express.Router();

const Hotel = require('../client/src/models/hotel')

router.get("/getallhotels", async(req, res) => {
    try {
        const hotels = await Hotel.find({})
        res.send(hotels)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.post("/gethotelbyid", async(req, res) => {
    
    const hotelid = req.body.hotelid

    try {
        const hotel = await Hotel.findOne({_id : hotelid})
        res.send(hotel)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

module.exports = router;