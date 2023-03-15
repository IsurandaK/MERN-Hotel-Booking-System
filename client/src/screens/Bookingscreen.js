import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import hotel from "../models/hotel";


function Bookingscreen({ match }) {

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [hotel, sethotel] = useState();

  let { hotelid, fromdate, todate } = useParams();

  const firstdate = moment(fromdate , 'DD-MM-YYYY')
  const lastdate = moment(todate , 'DD-MM-YYYY')

  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
  
  const totalamount = totaldays*hotel.price
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.post('/api/hotels/gethotelbyid', { hotelid: hotelid })).data

        sethotel(data)
        setloading(false)
        console.log(data);
      } catch (error) {
        seterror(true)
        console.log(error);
        setloading(false)
      }
    };
    fetchData();
  }, []);


  return (
    <div className="m-5">
      {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error...</h1>) : (<div>

        <div className="row mt-5 bs">
          <div className="col-md-6">
            <h1>{hotel.name}</h1>
            <img src={hotel.imageurls[0]} className="bigimg" />
          </div>
          <div className="col-md-6">
            <div>
            <h1>Booking Details</h1>
            <hr />

            <p>Name :</p>
            <p>From Date : {fromdate}</p>
            <p>To Date : {todate}</p>
            </div>

            <div>
              <h1>Amount</h1>
              <hr />
              <p>Total days : {totaldays} </p>
              <p>Price per day : {hotel.price}</p>
              <p>Total Amount : {}</p>
            </div>

            <div style={{float:'right'}}>
              <button className="btn btn-primary">Pay Now</button>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default Bookingscreen