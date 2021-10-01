// import { pool } from '../../../../database/db'
import {useState} from 'react'
import Image from 'next/image'
import Header from '../../../../components/Header'
import BackButton from '../../../../components/BackButton'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import {amenitiesDefaultArr} from '../../../../imports/imports'


const Residence = () => {
    const [amenitySpec, setAmenitySpec] = useState(amenitiesDefaultArr.slice(0,5))

    return (
        <>  
            <Header />
            <div className="residence-page">
                <div className="name">
                    <BackButton />
                    {/* Res Name */}
                    <h2>Smuts Hall</h2>
                </div>
                <div className="res-banner">
                    <div className="content">
                        <h3 style={{fontWeight: 500}}>Overall Quality Rating</h3>
                        {/* Res Overall Rating */}
                        <h1>4.5</h1>
                        <Rating name="read-only" size="large" value={4.5} precision={0.25} readOnly />
                        <button className="btn-main">Write A Review</button>
                        {/* <Button variant="contained" >Write a Review</Button> */}
                    </div>
                    <div className="image">
                        {/* Res Image */}
                        <Image 
                            src="/assets/uni-images/uct.jpg"
                            alt="uni"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="res-content">
                    <div className="res-specs">
                        <div className="spacing">
                            <h5>Rating Breakdown</h5>
                            <div className="rating-spec">
                                <div>Room - <span className="bold">4.5</span></div>
                                <span><Rating name="read-only" value={4.5} precision={0.25} readOnly /></span>
                            </div>
                            <div className="rating-spec">
                                <div>Bathroom - <span className="bold">4.5</span></div>
                                <span><Rating name="read-only" value={4.5} precision={0.25} readOnly /></span>
                            </div>
                            <div className="rating-spec">
                                <div>Building - <span className="bold">4.5</span></div>
                                <span><Rating name="read-only" value={4.5} precision={0.25} readOnly /></span>
                            </div>
                            <div className="rating-spec">
                                <div>Location - <span className="bold">4.5</span></div>
                                <span><Rating name="read-only" value={4.5} precision={0.25} readOnly /></span>
                            </div>
                        </div>

                        <div className="spacing">
                            <h5>Amenities</h5>
                            {
                                amenitySpec.map(el => {
                                    const {icon, text, data} = el

                                    return <div key={data} className="amenity-spec">
                                        {icon}
                                        <span>{text}</span>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="reviews"></div>
                </div>
            </div>
        </>
    )
}

export default Residence
