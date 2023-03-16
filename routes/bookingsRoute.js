const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const Hotel = require("../models/hotel")
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Mm2IEIFS37SgUhiQRWKI6TR7ktr10cbWvakDGbMkOW48cnjBFuoKv3Lav7COYsWWO90q7dW5abxVSffn156Ki1j00zmtN07W8')


router.post("/bookhotel", async (req, res) => {
    const { hotel,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token } = req.body;

    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: totalamount * 100,
            customer: customer.id,
            currency: 'usd', 
            receipt_email: token.email,
        }, {
            idempotencyKey: uuidv4(),
        })

        if (payment) {

            
                const newbooking = new Booking({
                    hotel: hotel.name,
                    hotelid: hotel._id,
                    userid,
                    fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    totalamount,
                    totaldays,
                    transactionId: '1234',

                });


                const booking = await newbooking.save()

                const hoteltemp = await Hotel.findOne({ _id: hotel._id })

                hoteltemp.currentbookings.push({
                    bookingid: booking._id,
                    fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    userid: userid,
                    stat: booking.stat
                });

                await hoteltemp.save()

            

        }

        res.send('Payment Successfull, Your hotel is booked')

    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getbookingsbyuserid", async(req, res) => {

    const userid = req.body.userid

    try{
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }

});

router.post("/cancelbooking" , async(req, res) => {
    const {bookingid , hotelid} = req.body

    try {
        const bookingunit = await Booking.findOne({_id : bookingid})
        
        bookingunit.stat = 'cancelled'
        await bookingunit.save()
        const hotel = await Hotel.findOne({_id : hotelid})

        const bookings = hotel.currentbookings

        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        hotel.currentbookings = temp

        await hotel.save()

        res.send('Booking cancelled successfully')

    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.get("/getallbookings", async(req, res) => {
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;