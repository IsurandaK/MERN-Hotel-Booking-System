const express = require("express");
const router = express.Router();

const Hotel = require('../models/hotel')

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

router.post("/addhotel", async(req, res) => {
    try {
        const newhotel = new Hotel(req.body)
        await newhotel.save()
        
        res.send('Hotel Added Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;