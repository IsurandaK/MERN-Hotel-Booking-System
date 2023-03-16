import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

function Bookingscreen({ match }) {

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [hotel, sethotel] = useState();

  let { hotelid, fromdate, todate } = useParams();

  const firstdate = moment(fromdate, 'DD-MM-YYYY')
  const lastdate = moment(todate, 'DD-MM-YYYY')

  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1
  const [totalamount, settotalamount] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true)
        const data = (await axios.post('/api/hotels/gethotelbyid', { hotelid: hotelid })).data

        settotalamount(data.price * totaldays)

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


 

  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      hotel,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };

    try {
      setloading(true);
      const result = await axios.post('/api/bookings/bookhotel', bookingDetails)
      setloading(false);
      Swal.fire('Congratulations' , 'Your Hotel Booked Successfully' , 'success').then(result=>
        {
          window.location.href='/bookings'
        })
    } catch (error) {
      setloading(false)
      Swal.fire('Error' , 'Something went wrong' , 'error')
    }
  }



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

              <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
              <p>From Date : {fromdate}</p>
              <p>To Date : {todate}</p>
            </div>

            <div>
              <h1>Amount</h1>
              <hr />
              <p>Total days : {totaldays} </p>
              <p>Price per day : {hotel.price}</p>
              <p>Total Amount : {totalamount}</p>
            </div>

            <div style={{ float: 'right' }}>
              

              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency='USD'
                stripeKey="pk_test_51Mm2IEIFS37SgUhiUwYemh3IsAUNWyIiIWMVNtGWntS2hu9UT4syxM9c8VyMenu9JnLU79PueyhN2Z5VPOrlNHJA00h1MOXGbG">
              
              <button className="btn btn-primary"> Pay Now </button>


              </StripeCheckout> 

            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default Bookingscreen