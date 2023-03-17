import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {

        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href='/home'
        }

    }, [])


    return (
        <div className="mt-3 ml-3 mr-3 bs">
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Administrative Dashboard</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Hotels" key="2">
                    <Hotels />
                </TabPane>
                <TabPane tab="Add Hotel" key="3">
                    <h1>Add Hotel</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;



export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await (await axios.get("/api/bookings/getallbookings")).data
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        };
        fetchData();

    }, []);

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Booking</h1>

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Hotel Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                    {bookings.length && (bookings.map(booking=>{
                        return <tr>
                            <td>{booking._id}</td>
                            <td>{booking.userid}</td>
                            <td>{booking.hotel}</td>
                            <td>{booking.fromdate}</td>
                            <td>{booking.todate}</td>
                            <td>{booking.stat}</td>
                        </tr>
                    }))}
                    </tbody>
                </table>  
            </div>
        </div>
    )
};


export function Hotels() {

    const [hotels, sethotels] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await (await axios.get("/api/hotels/getallhotels")).data
                sethotels(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        };
        fetchData();

    }, []);

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Hotels</h1>

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Hotel ID</th>
                            <th>Hotel Name</th>
                            <th>Address</th>
                            <th>District</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Phone Number</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                    {hotels.length && (hotels.map(hotel=>{
                        return <tr>
                            <td>{hotel._id}</td>
                            <td>{hotel.name}</td>
                            <td>{hotel.address}</td>
                            <td>{hotel.district}</td>
                            <td>{hotel.category}</td>
                            <td>{hotel.price}</td>
                            <td>{hotel.phonenumber}</td>
                            <td>{hotel.description}</td>
                        </tr>
                    }))}
                    </tbody>
                </table>   
            </div>
        </div>
    )

};

export function Users() {

    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await (await axios.get("/api/users/getallusers")).data
                setusers(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        };
        fetchData();

    }, []);

    return (
        <div className="row">

            <div className="col-md-12">

                <h1>Users</h1>

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                    {users && (users.map(user=>{
                        return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                        </tr>
                    }))}
                    </tbody>
                </table>   
            </div>
        </div>
    )

};