// import { pool } from '../../../../database/db'
import {useState} from 'react'
import Image from 'next/image'
import Header from '../../../../components/Header'
import BackButton from '../../../../components/BackButton'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
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

                        <div className="spacing">
                            <h5>Class Breakdown</h5>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>First Year</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={50} />
                                    {/* Rating */}
                                    <span className="percentage">50%</span>
                                </div>
                            </div>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>Second Year</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={50} />
                                    {/* Rating */}
                                    <span className="percentage">50%</span>
                                </div>
                            </div>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>Third Year/Graduate</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={50} />
                                    {/* Rating */}
                                    <span className="percentage">50%</span>
                                </div>
                            </div>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>Post Graduate</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={50} />
                                    {/* Rating */}
                                    <span className="percentage">50%</span>
                                </div>
                            </div>
                        </div>

                        <div className="spacing">
                            <h5>Would Recommend to a Friend</h5>
                            <div className="percentage-div">
                                <LinearProgress variant="determinate" color="secondary" value={50} />
                                {/* Rating */}
                                <span className="percentage">50%</span>
                            </div>
                        </div>
                    </div>
                    <div className="reviews">
                        <h2>All Reviews (3)</h2>

                        {/* Reviews */}
                        <div className="reviews-container">
                            <div className="review">
                                <div className="rating-container">
                                    <Rating name="read-only" size="small" value={4.3} precision={0.25} readOnly />
                                    <p>4.3</p>
                                </div>
                                <p>Lived in a <span className="bold">Double</span> as a <span className="bold">First Year</span> in <span className="bold">2019</span></p>
                                <div className="recommends-div">
                                    <ThumbDownIcon color="error" />
                                    <p>Does not Recommend</p>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorem praesentium veniam, laborum quisquam ipsa voluptates error quia obcaecati fuga, quam nam similique? Deleniti doloremque illo eaque dignissimos deserunt soluta unde ea recusandae sit. Itaque, repellat et omnis voluptates dolor recusandae ea fugiat consectetur magnam libero a voluptatum, accusamus assumenda harum rem ad sunt debitis maiores vitae. Voluptatem fugit libero numquam, nesciunt assumenda fuga doloribus veritatis placeat amet consequatur ex, magni tempore non, aliquam odio ad eius nostrum iste! Molestias ea optio a sint quos dolorum veniam sunt beatae, commodi delectus fugiat culpa natus voluptatem consequuntur architecto, vel eos animi distinctio eaque sapiente similique neque consequatur? Sequi quisquam hic cum quae magnam inventore, veniam modi impedit voluptatum totam accusantium magni suscipit consectetur quia quo ad minus eum vero aliquam atque odit sit accusamus quidem autem! Deserunt laboriosam quia fugit placeat consequuntur, corrupti esse incidunt ullam soluta eaque pariatur molestias hic.</p>
                                <p style={{color: 'var(--gray-green)'}}>Reviewed on 1st October 2021</p>
                            </div>
                            <div className="review">
                                <div className="rating-container">
                                    <Rating name="read-only" size="small" value={4.3} precision={0.25} readOnly />
                                    <p>4.3</p>
                                </div>
                                <p>Lived in a <span className="bold">Double</span> as a <span className="bold">First Year</span> in <span className="bold">2019</span></p>
                                <div className="recommends-div">
                                    <ThumbDownIcon color="error" />
                                    <p>Does not Recommend</p>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorem praesentium veniam, laborum quisquam ipsa voluptates error quia obcaecati fuga, quam nam similique? Deleniti doloremque illo eaque dignissimos deserunt soluta unde ea recusandae sit. Itaque, repellat et omnis voluptates dolor recusandae ea fugiat consectetur magnam libero a voluptatum, accusamus assumenda harum rem ad sunt debitis maiores vitae. Voluptatem fugit libero numquam, nesciunt assumenda fuga doloribus veritatis placeat amet consequatur ex, magni tempore non, aliquam odio ad eius nostrum iste! Molestias ea optio a sint quos dolorum veniam sunt beatae, commodi delectus fugiat culpa natus voluptatem consequuntur architecto, vel eos animi distinctio eaque sapiente similique neque consequatur? Sequi quisquam hic cum quae magnam inventore, veniam modi impedit voluptatum totam accusantium magni suscipit consectetur quia quo ad minus eum vero aliquam atque odit sit accusamus quidem autem! Deserunt laboriosam quia fugit placeat consequuntur, corrupti esse incidunt ullam soluta eaque pariatur molestias hic.</p>
                                <p style={{color: 'var(--gray-green)'}}>Reviewed on 1st October 2021</p>
                            </div>
                            <div className="review">
                                <div className="rating-container">
                                    <Rating name="read-only" size="small" value={4.3} precision={0.25} readOnly />
                                    <p>4.3</p>
                                </div>
                                <p>Lived in a <span className="bold">Double</span> as a <span className="bold">First Year</span> in <span className="bold">2019</span></p>
                                <div className="recommends-div">
                                    <ThumbUpIcon color="primary" />
                                    <p>Recommends</p>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorem praesentium veniam, laborum quisquam ipsa voluptates error quia obcaecati fuga, quam nam similique? Deleniti doloremque illo eaque dignissimos deserunt soluta unde ea recusandae sit. Itaque, repellat et omnis voluptates dolor recusandae ea fugiat consectetur magnam libero a voluptatum, accusamus assumenda harum rem ad sunt debitis maiores vitae. Voluptatem fugit libero numquam, nesciunt assumenda fuga doloribus veritatis placeat amet consequatur ex, magni tempore non, aliquam odio ad eius nostrum iste! Molestias ea optio a sint quos dolorum veniam sunt beatae, commodi delectus fugiat culpa natus voluptatem consequuntur architecto, vel eos animi distinctio eaque sapiente similique neque consequatur? Sequi quisquam hic cum quae magnam inventore, veniam modi impedit voluptatum totam accusantium magni suscipit consectetur quia quo ad minus eum vero aliquam atque odit sit accusamus quidem autem! Deserunt laboriosam quia fugit placeat consequuntur, corrupti esse incidunt ullam soluta eaque pariatur molestias hic.</p>
                                <p style={{color: 'var(--gray-green)'}}>Reviewed on 1st October 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Residence
