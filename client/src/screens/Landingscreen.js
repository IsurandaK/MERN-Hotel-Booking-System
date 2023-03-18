import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
    return (
        <div className="row landing">

            <div className="col-md-12 text-center">
                <h2 style={{color: 'white' , fontSize: '80px'}}><b>JOURNEY.COM</b></h2>
                <h1 style={{color: 'white'}}>Life is a journey. Enjoy your life with JOURNEY.COM</h1>
                
                   
                        <Link to='/home'>
                            <button className="btn btn-primary">Click to Explore</button>
                        </Link>
                    
                
            </div>
        </div>
    )

}

export default Landingscreen