const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    district : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    phonenumber : {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    imageurls : [],
    currentbookings : [],
    category : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    }
} , {
    timestamps : true,
}) 

const hotelModel = mongoose.model('hotels', hotelSchema)

module.exports = hotelModel