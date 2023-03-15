const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const Hotel = require("../models/hotel")
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51MlxH5SABQ8fb5lzBUZd1JJnYu6BCBhjbgm9BZjrOGiw2sFfteXn0IEYWmM1LrGDAUWnHDbXx0TVvhrWLYLugDcN002FrgOOcx')


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

            try {
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
                res.send('Room Booked Successfully')

            } catch (error) {
                console.log(error);
                return res.status(400).json({ error });
            }

        }

        res.send('Payment Successfull, Your hotel is booked')

    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;