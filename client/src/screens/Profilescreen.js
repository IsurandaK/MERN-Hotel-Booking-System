import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {

        if (!user) {
            window.location.href = '/login'
        }

    }, [])

    return (
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>

                    <br />

                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? 'yes' : 'no'} </h1>

                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>

        </div>
    );
}

export default Profilescreen;

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const data = await (await axios.post("/api/bookings/getbookingsbyuserid", { userid: user._id })).data;
                console.log(data)
                setbookings(data)
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(error)
            }
        };
        fetchData();

    }, []);


    async function cancelBooking(bookingid, hotelid) {

        try {
            setloading(true)
            const result = await (await axios.post("/api/bookings/cancelbooking", { bookingid, hotelid })).data
            console.log(result);
            setloading(false)
            Swal.fire('Done', 'Booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error);
            setloading(false)
            Swal.fire('Error', 'Something went wrong', 'error')
        }

    }


    return (
        <div>
            <div className="row">
                <div className="col-md-6">

                    {bookings && (bookings.map(booking => {

                        return <div className="bs">
                            <h1>{booking.hotel}</h1>
                            <p><b>BookingId :</b> {booking._id}</p>
                            <p><b>Check In :</b> {booking.fromdate}</p>
                            <p><b>Check Out :</b> {booking.todate}</p>
                            <p><b>Total Amount :</b> {booking.totalamount}</p>
                            <p><b>Status : {""}</b> 
                            {booking.stat === 'cancelled' ? (<Tag color="red">Cancelled</Tag>) : (<Tag color="green">Confirmed</Tag>)}
                            </p>

                            {booking.stat !== 'cancelled' && (
                                <div className="text-right">
                                    <button class='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.hotelid) }}> Cancel Booking</button>
                                </div>
                            )}

                        </div>
                    }))}

                </div>

            </div>
        </div>
    )
}