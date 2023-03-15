const express = require("express");

const app = express();

const dbConfig = require('./db')
const hotelsRoute = require('./routes/hotelsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

app.use(express.json())

app.use('/api/hotels' , hotelsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings' , bookingsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Server Started using nodemon`));
