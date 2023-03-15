const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const Hotel = require("../models/hotel")
const moment = require("moment");


router.post("/bookhotel", async (req, res) => {
    console.log(req.body);
    const { hotel,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays } = req.body


    try {
        const newbooking = new Booking({
            hotel: hotel.name,
            hotelid: hotel._id,
            userid,
            fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            transactionId: '1234'

        })


        const booking = await newbooking.save()

        const hoteltemp = await Hotel.findOne({ _id: hotel._id })

        hoteltemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            userid : userid,
            stat : booking.stat 
        });

        await hoteltemp.save()

        res.send('Room Booked Successfully')
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });
    }

});

module.exports = router