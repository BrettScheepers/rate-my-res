import { pool } from '../../../database/db'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../../components/Header'
import BackButton from '../../../components/BackButton'
import Meta from '../../../components/Meta'
import Image from 'next/image'
import moment from 'moment'
import {amenitiesDefaultArr} from '../../../imports/imports'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import FormGroup from '@mui/material/FormGroup'; 
import Checkbox from '@mui/material/Checkbox'; 
import Rating from '@mui/material/Rating';

export const getStaticPaths = async () => {
    const res = await pool.query('SELECT * FROM universities')
    const data = await res.rows

    const paths = data.map(uni => {
        return {
            params: { slugUni: uni.uni_slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const slugUni = context.params.slugUni
    const resUni = await pool.query('SELECT * FROM universities WHERE uni_slug = $1', [slugUni])
    const dataUni = await resUni.rows[0]
    const resResidences = await pool.query(
        'SELECT r.res_slug, r.res_name, r.date_created, r.uni_slug, count(r2.*) as review_count, avg(r2.room_rating)::numeric(10,1) as room_avg, avg(r2.building_rating)::numeric(10,1) as building_avg,avg(r2.bathroom_rating)::numeric(10,1) as bathroom_avg,avg(r2.location_rating)::numeric(10,1) as location_avg FROM residences r inner join reviews r2 on r.res_slug = r2.res_slug WHERE uni_slug = $1 AND r.is_reviewed = true group by r.res_slug ', [slugUni])
    let dataResidences = await resResidences.rows
    dataResidences = dataResidences.map(el => {
        const dateCreated = moment(el.date_created).format('DD/MM/YYYY')
        return {
            ...el,
            date_created: dateCreated
        }
    })
    // console.log(dataResidences)

    return {
        props: { university: dataUni, residences: dataResidences },
        revalidate: 60
    }
}

const University = ({ university, residences }) => {
    const router = useRouter()
    const { slugUni } = router.query
    const { uni_id: id, uni_name: name, uni_slug: slug} = university
    const totalNumReviews = residences.reduce((acc, cur) => acc + parseInt(cur.review_count), 0) || 0
    const [generalSort, setGeneralSort] = useState('name')
    const [dataResidences, setDataResidences] = useState(
        residences
            .map((el) => {
                const { room_avg, building_avg, bathroom_avg, location_avg } = el
                const totalAvg = parseFloat(((parseFloat(room_avg) + parseFloat(building_avg) + parseFloat(bathroom_avg) + parseFloat(location_avg))/4).toFixed(1));

                return {
                    ...el,
                    totalAvg
                }
            })
            .sort((a,b) => a.res_name.localeCompare(b.res_name))
    )
    
    const [amenities, setAmenities] = useState([...amenitiesDefaultArr])

    useEffect(() => {
        if (generalSort === 'name') {
            setDataResidences(dataResidences.sort((a,b) => a.res_name.localeCompare(b.res_name)))
        }
        if (generalSort === 'highest-rated') {
            setDataResidences(dataResidences.sort((a,b) => a.totalAvg - b.totalAvg))
        }
        if (generalSort === 'most-reviews') {
            setDataResidences(dataResidences.sort((a,b) => a.review_count - b.review_count))
        }
    }, [generalSort, dataResidences])

    return (
        <>
            <Meta title={`Rate My Res | ${name}`} description={`Residence information for ${name}`} />
            <Header />
            <div className="university-page">
                <div className="banner">
                    <Image
                        src={`/assets/uni-images/${slug}.jpg`}
                        alt={`${slug}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="uni-content">
                    <div className="filter">
                        <BackButton />
                        <h2>{name}</h2>
                        <div className="spacing">
                            <p>{totalNumReviews} student reviews</p>
                        </div>
                        <div className="spacing">
                            <h5>Sort</h5>
                            <RadioGroup
                                aria-label="sort"
                                defaultValue="name"
                                name="sort"
                                value={generalSort}
                                onChange={(e) => {
                                    setGeneralSort(e.target.value)
                                    // handleGeneralSort(e)
                                }}
                            >
                                <FormControlLabel value="name" control={<Radio color="primary" />} label="Name" />
                                <FormControlLabel value="highest-rated" control={<Radio color="primary" />} label="Highest Rated" />
                                <FormControlLabel value="most-reviews" control={<Radio color="primary" />} label="Most Reviews" />
                            </RadioGroup>
                        </div>
                        {/* <div className="spacing">
                            <h5>Filter By Class</h5>
                            <RadioGroup
                                aria-label="class"
                                defaultValue="all"
                                name="class"
                            >
                                <FormControlLabel value="all" control={<Radio color="primary" />} label="All Years" />
                                <FormControlLabel value="first-year" control={<Radio color="primary" />} label="First Years" />
                                <FormControlLabel value="second-year" control={<Radio color="primary" />} label="Second Years" />
                                <FormControlLabel value="grad" control={<Radio color="primary" />} label="Third Years/Graduates" />
                                <FormControlLabel value="post-grad" control={<Radio color="primary" />} label="Post Graduates" />
                            </RadioGroup>
                        </div> */}
                        <div className="spacing">
                            <h5>Amenities</h5>
                            <p className="subtitle">generated by our reviewers</p>
                            <FormGroup>
                                {
                                    amenities.map((el, index) => {
                                        const { data, text } = el

                                        return (
                                            <FormControlLabel
                                                label={text}
                                                key={index}
                                                control={
                                                    <Checkbox 
                                                        value={data}
                                                        color="primary"
                                                        disabled 
                                                        onChange={
                                                        (e) => console.log(e.target.checked, e.target.value)
                                                    } />
                                                }
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </div>
                    </div>
                    <div className="residences">
                        <h3><span className="text">{dataResidences.length} Residences</span> match your filters</h3>

                        <div className="residence-card-container">
                            {/* <div className="residence-card" onClick={() => router.push(`/universities/${slugUni}/residence/`)}>
                                <Image
                                    src="/assets/ReviewAvatar.svg"
                                    alt="house-svg"
                                    width={75}
                                    height={75}
                                    className="residence-card-img"
                                />

                                <div className="residence-card-content">
                                    <h4>Kovacs</h4>
                                    <div className="rating-container">
                                        <Rating name="read-only" value={4.3} precision={0.25} readOnly />
                                        <p>4.3</p>
                                    </div>
                                    <p>2 reviews</p>
                                </div>
                            </div> */}

                            {
                                dataResidences.length > 0 && dataResidences.map((el, index) => {
                                    const {res_slug: resSlug, res_name: resName, uni_slug: uniSlug, date_created: dateCreated, room_avg: roomAvg, building_avg: buildingAvg, bathroom_avg: bathroomAvg, location_avg: locationAvg, totalAvg} = el;
                                    const reviewCount = parseInt(el.review_count)
                                    // const totalAvg = parseFloat(((parseFloat(roomAvg) + parseFloat(buildingAvg) + parseFloat(bathroomAvg) + parseFloat(locationAvg))/4).toFixed(1));

                                    return (
                                        <div className="residence-card" key={index} onClick={() => router.push(`/universities/${slugUni}/${resSlug}/`)}>
                                            <Image
                                                src="/assets/ReviewAvatar.svg"
                                                alt="house-svg"
                                                width={75}
                                                height={75}
                                                className="residence-card-img"
                                            />

                                            <div className="residence-card-content">
                                                <h4>{resName}</h4>
                                                <div className="rating-container">
                                                    <Rating name="read-only" value={totalAvg} precision={0.25} readOnly />
                                                    <p>{totalAvg}</p>
                                                </div>
                                                <p>{reviewCount} reviews</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <h2>Cant find Your Res? <Link as={`/universities/${slugUni}/add-res`} href="/universities/[slugUni]/add-res" passHref><span className="text click">Add it here</span></Link></h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default University
