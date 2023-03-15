const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    hotel : {
        type: String, required: true
    },
    hotelid : {
        type: String, required: true
    },
    userid : {
        type: String, required: true
    },
    fromdate : {
        type: String, required: true
    },
    todate : {
        type: String, required: true
    },
    totalamount : {
        type: Number, required: true
    },
    transactionId : {
        type: String, required: true
    },
    status : {
        type: String, required: true, default : 'booked'
    }



}, {
    timestamps : true,
})

const bookingmodel = mongoose.model('booking' , bookingSchema);

module.exports = bookingSchema