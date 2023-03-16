import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
    return (
        <div className="mt-3 ml-3 mr-3 bs">
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Administrative Dashboard</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Hotels" key="2">
                    <h1>Hotels</h1>
                </TabPane>
                <TabPane tab="Add Hotel" key="3">
                    <h1>Add Hotel</h1>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <h1>List of Users</h1>
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

            <div className="col-md-10">

                <h1>Booking</h1>
                {bookings.length && <h1>There are total {bookings.length} bookings</h1>}
            </div>

        </div>
    )

}