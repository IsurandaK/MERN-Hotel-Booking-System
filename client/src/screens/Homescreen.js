import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from '../components/Hotel';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Homescreen = () => {

    const [hotels, sethotels] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()

    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duplicatehotels, setduplicatehotels] = useState([])

    const [searchkey, setsearchkey] = useState('')
    const [category, setcategory] = useState('all')


    useEffect(() => {
        const fetchData = async () => {

            try {
                setloading(true)
                const { data: response } = await axios.get('/api/hotels/getallhotels');
                sethotels(response);
                setduplicatehotels(response);
                setloading(false)

            } catch (error) {
                seterror(true)
                console.error(error.message);
                setloading(false)
            }

        }

        fetchData();
    }, []);


    const filterByDate = (dates) => {
        const from = moment(dates[0].$d).format('DD.MM.YYYY');
        const to = moment(dates[1].$d).format('DD.MM.YYYY');
        setfromdate(from);
        settodate(to);


        var temphotels = []
        var availability = false
        for (const hotel of duplicatehotels) {
            
            if (hotel.currentbookings.length > 0) {

                for (const booking of hotel.currentbookings) {
                    
                    if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate))
                     {

                        if (

                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            availability = true;
                        }
                    }
                }
            }

            if (availability === true || hotel.currentbookings.length === 0) {
                temphotels.push(hotel);
            }

        }
        sethotels(temphotels);
    }

    function filterBySearch() {

        const temphotels = duplicatehotels.filter(hotel => hotel.name.toLowerCase().includes(searchkey.toLowerCase()))

        sethotels(temphotels)

    }

    function filterByCategory(e) {

        setcategory(e)

        if (e !== 'all') {
            const temphotels = duplicatehotels.filter(hotel => hotel.category.toLowerCase() === e.toLowerCase())

            sethotels(temphotels)
        }
        else {
            sethotels(duplicatehotels)
        }
    }

    return (
        <div className='container'>

            <div className='row mt-5 bs'>

                <div className='col-md-3'>

                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

                </div>

                <div className='col-md-5'>
                    <input type='text' className='form-control' placeholder='What is your destination?'
                        value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch}
                    />
                </div>

                <div className='col-md-3'>
                    <select className='form-control' value={category} onChange={(e) => { filterByCategory(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>



            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (<h1>Loading...</h1>) : (hotels.map(hotel => {

                    return <div className="col-md-9 mt-2">
                        <Hotel hotel={hotel} fromdate={fromdate} todate={todate} />
                    </div>;

                }))}
            </div>

        </div>
    )
}

export default Homescreen;