// import { pool } from '../../../../database/db'
import {useState} from 'react'
import {server} from '../../../../config/index'
import Image from 'next/image'
import Header from '../../../../components/Header'
import BackButton from '../../../../components/BackButton'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {amenitiesDefaultArr} from '../../../../imports/imports'
import { useRouter } from 'next/router';
import moment from 'moment'

export async function getServerSideProps(context) {
    const { slugUni, resSlug } = context.params

    const res = await fetch(`${server}/api/universities/${slugUni}/${resSlug}`)
    const data = await res.json()
    // console.log(data)

    return {
        props: {
            data,
        },
    }
}

const Residence = ({ data }) => {
    const router = useRouter()
    const { slugUni, resSlug } = router.query

    // Api Data Processing
    const { res_name: resName } = data.residence
    const [reviews, setReviews] = useState(data.reviews)
    
    // Scoring Totals
    const roomTotal = parseFloat((reviews.reduce((acc,cur) => acc + cur.room_rating, 0)/reviews.length).toFixed(1))
    const buildingTotal = parseFloat((reviews.reduce((acc,cur) => acc + cur.building_rating, 0)/reviews.length).toFixed(1))
    const bathroomTotal = parseFloat((reviews.reduce((acc,cur) => acc + cur.bathroom_rating, 0)/reviews.length).toFixed(1))
    const locationTotal = parseFloat((reviews.reduce((acc,cur) => acc + cur.location_rating, 0)/reviews.length).toFixed(1))

    // Residence Total
    const residenceTotal = parseFloat(((roomTotal+buildingTotal+bathroomTotal+locationTotal)/4).toFixed(1))

    // Class Year Breakdown
    const firstYearPercentage = Math.floor(reviews.filter((el) => el.class_year === 'first-year').length/reviews.length * 100) || 0
    const secondYearPercentage = Math.floor(reviews.filter((el) => el.class_year === 'second-year').length/reviews.length * 100) || 0
    const thirdYearPercentage = Math.floor(reviews.filter((el) => el.class_year === 'third-year').length/reviews.length * 100) || 0
    const gradYearPercentage = Math.floor(reviews.filter((el) => el.class_year === 'post-graduate').length/reviews.length * 100) || 0

    // Recommended Total
    const recommendedPercentage = Math.floor(reviews.filter((el) => el.recommend).length/reviews.length * 100) || 0

    // Amenity Breakdown
    const reviewAmenities = reviews.map(el => {
        return el.amenities.split('@#')
    })
    console.log(reviewAmenities)
    const amenitySpec = amenitiesDefaultArr.filter((el) => {
        let amenityCounter = 0

        reviewAmenities.forEach(item => {
            if (item.includes(el.data)) amenityCounter++
        })

        if (amenityCounter >= reviewAmenities.length/2) return el
    })

    return (
        <>  
            <Header />
            <div className="residence-page">
                <div className="name">
                    <BackButton />
                    {/* Res Name */}
                    <h2>{resName}</h2>
                </div>
                <div className="res-banner">
                    <div className="content">
                        <h3 style={{fontWeight: 500}}>Overall Quality Rating</h3>
                        {/* Res Overall Rating */}
                        <h1>{residenceTotal}</h1>
                        <Rating name="read-only" size="large" value={residenceTotal} precision={0.25} readOnly />
                        <button className="btn-main" onClick={() => router.push(`/universities/${slugUni}/${resSlug}/review`)}>Write A Review</button>
                        {/* <Button variant="contained" >Write a Review</Button> */}
                    </div>
                    <div className="image">
                        {/* Res Image */}
                        <Image 
                            src={`/assets/uni-images/${slugUni}.jpg`}
                            alt={`${slugUni}`}
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
                                <div>Room - <span className="bold">{roomTotal}</span></div>
                                <span><Rating name="read-only" value={roomTotal} precision={0.25} readOnly /></span>
                            </div>
                            <div className="rating-spec">
                                <div>Bathroom - <span className="bold">{bathroomTotal}</span></div>
                                <span><Rating name="read-only" value={bathroomTotal} precision={0.25} readOnly /></span>
                            </div>
                            <div className="rating-spec">
                                <div>Building - <span className="bold">{buildingTotal}</span></div>
                                <span><Rating name="read-only" value={buildingTotal} precision={0.25} readOnly /></span>
                            </div>
                            <div className="rating-spec">
                                <div>Location - <span className="bold">{locationTotal}</span></div>
                                <span><Rating name="read-only" value={locationTotal} precision={0.25} readOnly /></span>
                            </div>
                        </div>

                        <div className="spacing">
                            <h5>Amenities</h5>
                            {
                                amenitySpec.length > 0 && amenitySpec.map(el => {
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
                                    <LinearProgress variant="determinate" color="secondary" value={firstYearPercentage} />
                                    {/* Rating */}
                                    <span className="percentage">{firstYearPercentage}%</span>
                                </div>
                            </div>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>Second Year</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={secondYearPercentage} />
                                    {/* Rating */}
                                    <span className="percentage">{secondYearPercentage}%</span>
                                </div>
                            </div>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>Third Year</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={thirdYearPercentage} />
                                    {/* Rating */}
                                    <span className="percentage">{thirdYearPercentage}%</span>
                                </div>
                            </div>
                            {/* Different Years */}
                            <div className="class-spec">
                                <h6>Post Graduate</h6>
                                <div className="percentage-div">
                                    <LinearProgress variant="determinate" color="secondary" value={gradYearPercentage} />
                                    {/* Rating */}
                                    <span className="percentage">{gradYearPercentage}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="spacing">
                            <h5>Would Recommend to a Friend</h5>
                            <div className="percentage-div">
                                <LinearProgress variant="determinate" color="secondary" value={recommendedPercentage} />
                                {/* Rating */}
                                <span className="percentage">{recommendedPercentage}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="reviews">
                        <h2>All Reviews ({reviews.length})</h2>

                        {/* Reviews */}
                        <div className="reviews-container">
                            {/* <div className="review">
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
                            </div> */}

                            {
                                reviews.map((el, index) => {
                                    const { room_rating: roomRating, bathroom_rating: bathroomRating, building_rating: buildingRating, location_rating: locationRating, class_year: classYear, calender_year: calenderYear, room_type: roomType, recommend, comment, date_created: dateCreated } = el
                                    const reviewTotal = parseFloat(((roomRating+buildingRating+bathroomRating+locationRating)/4).toFixed(1))

                                    return (
                                        <div className="review" key={index}>
                                            <div className="rating-container">
                                                <Rating name="read-only" size="small" value={reviewTotal} precision={0.25} readOnly />
                                                <p>{reviewTotal}</p>
                                            </div>
                                            <p>Lived in a <span className="bold">{roomType}</span> as a <span className="bold">{classYear}</span> in <span className="bold">{calenderYear}</span></p>
                                            {
                                                recommend ? (
                                                    <div className="recommends-div">
                                                        <ThumbUpIcon color="primary" />
                                                        <p>Recommends</p>
                                                    </div>
                                                ) : (
                                                    <div className="recommends-div">
                                                        <ThumbDownIcon color="error" />
                                                        <p>Does not Recommend</p>
                                                    </div>
                                                )
                                            }
                                            <p>{comment}</p>
                                            <p style={{color: 'var(--gray-green)'}}>Reviewed on {moment(dateCreated).format("Do MMMM YYYY")}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Residence
