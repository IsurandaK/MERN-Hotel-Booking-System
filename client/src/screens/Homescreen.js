import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from '../components/Hotel';

const Homescreen = () => {

    const [hotels, sethotels] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()

    useEffect(() => {
        const fetchData = async () => {

            try {
                setloading(true)
                const { data: response } = await axios.get('/api/hotels/getallhotels');
                sethotels(response);
                setloading(false)

            } catch (error) {
                seterror(true)
                console.error(error.message);
                setloading(false)
            }

        }

        fetchData();
    }, []);

    return (
        <div className='container'>

            <div className="row justify-content-center mt-5">
                {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (hotels.map(hotel => {

                    return <div className="col-md-9 mt-2">
                        <Hotel hotel={hotel}/>
                    </div>;

                }))}
            </div>

        </div>
    )
}

export default Homescreen;