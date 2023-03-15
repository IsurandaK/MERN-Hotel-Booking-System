const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")

router.post("/bookhotel", async(req, res) => {

    const {hotel,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays} = req.body


        try {
            const newbooking = new Booking({
                hotel : hotel.name,
                hotelid : hotel._id,
                userid,
                fromdate,
                todate,
                totalamount,
                totaldays,
                transactionId : '1234'
            })

            const booking = await newbooking.save()
            res.send('Room Booked Successfully')
        } catch (error) {
            return res.status(400).json({ error });
        }

});

module.exports = router