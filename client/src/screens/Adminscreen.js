import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Error from "../components/Error";
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {

        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home'
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
                    <Addhotel />
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
                        {bookings.length && (bookings.map(booking => {
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
                        {hotels.length && (hotels.map(hotel => {
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
                        {users && (users.map(user => {
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

// Add Hotel

export function Addhotel() {

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    const[name , setname] = useState('')
    const[address , setaddress] = useState()
    const[district , setdistrict] = useState()
    const[price , setprice] = useState()
    const[phonenumber , setphonenumber] = useState()
    const[description , setdescription] = useState()
    const[category , setcategory] = useState()
    const[imageurl1 , setimageurl1] = useState()
    const[imageurl2 , setimageurl2] = useState()
    const[imageurl3 , setimageurl3] = useState()

    async function addHotel() {
        const newhotel ={
            name,
            address,
            district,
            price,
            phonenumber,
            description,
            category,
            imageurls:[imageurl1 , imageurl2 , imageurl3]
        }

        try {
            setloading(true);
            const result = await (await axios.post('/api/hotels/addhotel' , newhotel)).data
            console.log(result)
            setloading(false)
            Swal.fire('Done' , 'Hotel Added Successfully' , 'success').then(result=>{
                window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Error' , 'Something went wrong' , 'error')
        }
    }

    return (
        <div className="row">

            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Hotel name"
                value={name} onChange={(e)=>{setname(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Address" 
                value={address} onChange={(e)=>{setaddress(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="District" 
                value={district} onChange={(e)=>{setdistrict(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Price per day" 
                value={price} onChange={(e)=>{setprice(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Phone number" 
                value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}
                />
            </div>

            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Description" 
                value={description} onChange={(e)=>{setdescription(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Category" 
                value={category} onChange={(e)=>{setcategory(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Image URL 1" 
                value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Image URL 2" 
                value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
                />
                <input type="text" className="form-control" placeholder="Image URL 3" 
                value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
                />

                <div className="text-right">

                    <button className="btn btn-primary mt-2" onClick={addHotel}>Add Hotel</button>

                </div>
            </div>

        </div>
    )
}