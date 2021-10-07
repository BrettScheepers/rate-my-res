import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {server} from '../../../config/index'
import Header from '../../../components/Header'
import BackButton from '../../../components/BackButton'
import ReviewModal from '../../../components/ReviewModal'
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment'
import {amenitiesDefaultArr} from '../../../imports/imports'

// Icons
// import WcIcon from '@mui/icons-material/Wc'; //Private Bathroom
// import FastfoodIcon from '@mui/icons-material/Fastfood'; //Dining Hall
// import WifiIcon from '@mui/icons-material/Wifi'; //Wifi
// import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'; //Laundry
// import AcUnitIcon from '@mui/icons-material/AcUnit'; //Air Cond
// import KitchenIcon from '@mui/icons-material/Kitchen'; //Kitchen
// import WeekendIcon from '@mui/icons-material/Weekend'; //Student Area
// import ElevatorIcon from '@mui/icons-material/Elevator'; //Elevator
// import RunCircleIcon from '@mui/icons-material/RunCircle'; //Gym
// import EmailIcon from '@mui/icons-material/Email'; //Mailroom


const AddDorm = () => {
    const router = useRouter()
    let [amenitiesList, setAmenitiesList] = useState([...amenitiesDefaultArr])
    // let amenitiesList = amenitiesDefaultArr
    const [resName, setResName] = useState('')
    const [roomRating, setRoomRating] = useState(3)
    const [buildingRating, setBuildingRating] = useState(3)
    const [bathroomRating, setBathroomRating] = useState(3)
    const [locationRating, setLocationRating] = useState(3)
    const [classYear, setClassYear] = useState('first-year')
    const [calenderYear, setCalenderYear] = useState(2021)
    const [roomType, setRoomType] = useState('single')
    const [recommend, setRecommend] = useState(true)
    const [comment, setComment] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [reviewCompleted, setReviewCompleted] = useState(false)

    const addAmenity = (incoming) => {
        let dataItem = incoming
        let _amenities = amenitiesList.map(el => {
            if (el.data === dataItem) {
                return {
                    ...el,
                    active: !el.active
                }
            }
            return el
        })

        setAmenitiesList(_amenities)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const amenities = amenitiesList
            .filter(el => el.active)
            .map(el => el.data)
            .join("@#")

        const dateCreated = moment().format("YYYY-MM-DD")
        const { slugUni } = router.query

        const resAndReview = {
            resName,
            roomRating,
            buildingRating,
            bathroomRating,
            locationRating,
            classYear,
            calenderYear,
            roomType,
            recommend,
            amenities,
            comment,
            dateCreated,
            slugUni
        }

        // console.log(resAndReview)

        fetch(`${server}/api/universities/${slugUni}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resAndReview)
        }).then(res => {
            res.json()
        })
        .then(data => console.log('Completed'))
        .catch(error => console.log(error))

        setReviewCompleted(true)
        setTimeout(() => {
            router.push('/')
        },3000)
    }

    useEffect(() => {
        if (
            resName &&
            amenitiesList.filter(el => el.active).length > 0 &&
            comment.length >= 5
        ) setIsValid(true)
        else setIsValid(false)
    }, [
        resName,
        amenitiesList,
        comment
    ])

    return (
        <>
            {reviewCompleted && <ReviewModal />}
            <Header />
            <div className="add-dorm-page">
                <BackButton />
                <form>
                    {/* Res Name */}
                    <h2>Add a <span className="text">Res</span></h2>
                    <div className="form-box res-name-form-box">
                        <h4 style={{marginBottom: "1rem"}}>Provide Your Res Name</h4>
                        <TextField fullWidth variant="outlined" color="secondary" placeholder="Enter Res Name"
                            value={resName}
                            onChange={(e) => setResName(e.target.value)}
                        />
                    </div>

                    {/* Room Rating */}
                    <div className="form-box">
                        <div className="form-text">
                            <h4>Rate the <span className="text">room</span> out of 5 stars</h4>
                            <p>Keep in mind: size, comfort, natural lighting</p>
                        </div>
                        <div className="input-container">
                            <Slider 
                                thumb="true"
                                // marks={[{'1':1}, {'2':2}, {'3':3}, {'4':4}, {'5':5}]}
                                marks={true}
                                valueLabelDisplay="on"
                                track="normal"
                                min={1}
                                max={5}
                                step={1}
                                color="secondary"
                                defaultValue={roomRating}
                                value={roomRating}
                                onChange={(e) => setRoomRating(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Building Rating */}
                    <div className="form-box">
                        <div className="form-text">
                            <h4>Rate the <span className="text">building</span> out of 5 stars</h4>
                            <p>Keep in mind: amenities, security, age of building</p>
                        </div>
                        <div className="input-container">
                            <Slider 
                                thumb="true"
                                // marks={[{'1':1}, {'2':2}, {'3':3}, {'4':4}, {'5':5}]}
                                marks={true}
                                valueLabelDisplay="on"
                                track="normal"
                                min={1}
                                max={5}
                                step={1}
                                color="secondary"
                                value={buildingRating}
                                onChange={(e) => setBuildingRating(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Bathroom Rating */}
                    <div className="form-box">
                        <div className="form-text">
                            <h4>Rate the <span className="text">bathroom</span> out of 5 stars</h4>
                            <p>Keep in mind: cleanliness, private vs communal</p>
                        </div>
                        <div className="input-container">
                            <Slider 
                                thumb="true"
                                // marks={[{'1':1}, {'2':2}, {'3':3}, {'4':4}, {'5':5}]}
                                marks={true}
                                valueLabelDisplay="on"
                                track="normal"
                                min={1}
                                max={5}
                                step={1}
                                color="secondary"
                                value={bathroomRating}
                                onChange={(e) => setBathroomRating(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Location Rating */}
                    <div className="form-box">
                        <div className="form-text">
                            <h4>Rate the <span className="text">location</span> out of 5 stars</h4>
                            <p>Keep in mind: distance to classes, safety of area, vibe</p>
                        </div>
                        <div className="input-container">
                            <Slider 
                                thumb="true"
                                // marks={[{'1':1}, {'2':2}, {'3':3}, {'4':4}, {'5':5}]}
                                marks={true}
                                valueLabelDisplay="on"
                                track="normal"
                                min={1}
                                max={5}
                                step={1}
                                color="secondary"
                                value={locationRating}
                                onChange={(e) => setLocationRating(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Class Year */}
                    <div className="form-box form-box-no-inbetween">
                        <div className="form-text">
                            <h4>What <span className="text">class year</span> did you live here?</h4>
                        </div>
                        <div className="input-container">
                            <Select
                                color="secondary"
                                value={classYear}
                                onChange={(e) => setClassYear(e.target.value)}
                            >
                                <MenuItem value={"first-year"}>First Year</MenuItem>
                                <MenuItem value={"second-year"}>Second Year</MenuItem>
                                <MenuItem value={"third-year"}>Third Year</MenuItem>
                                <MenuItem value={"post-graduate"}>Post Graduate</MenuItem>
                            </Select>
                        </div>
                    </div>

                    {/* Calender Year */}
                    <div className="form-box form-box-no-inbetween">
                        <div className="form-text">
                            <h4>What <span className="text">calender year</span> did you live here?</h4>
                        </div>
                        <div className="input-container">
                            <Select
                                color="secondary"
                                value={calenderYear}
                                onChange={(e) => setCalenderYear(e.target.value)}
                            >
                                <MenuItem value={2010}>2010</MenuItem>
                                <MenuItem value={2011}>2011</MenuItem>
                                <MenuItem value={2012}>2012</MenuItem>
                                <MenuItem value={2013}>2013</MenuItem>
                                <MenuItem value={2014}>2014</MenuItem>
                                <MenuItem value={2015}>2015</MenuItem>
                                <MenuItem value={2016}>2016</MenuItem>
                                <MenuItem value={2017}>2017</MenuItem>
                                <MenuItem value={2018}>2018</MenuItem>
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                            </Select>
                        </div>
                    </div>

                    {/* Room Type */}
                    <div className="form-box form-box-no-inbetween">
                        <div className="form-text">
                            <h4>What <span className="text">room type</span> did you live in?</h4>
                        </div>
                        <div className="input-container">
                            <Select
                                color="secondary"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <MenuItem value={"single"}>Single</MenuItem>
                                <MenuItem value={"double"}>Double</MenuItem>
                                <MenuItem value={"triple"}>Triple</MenuItem>
                                <MenuItem value={"quad"}>Quad</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Select>
                        </div>
                    </div>

                    {/* Recommend */}
                    <div className="form-box form-box-no-inbetween">
                        <div className="form-text">
                            <h4>Would you <span className="text">recommend</span> this res to a friend?</h4>
                        </div>
                        <div className="input-container">
                            <Select
                                color="secondary"
                                value={recommend}
                                onChange={(e) => setRecommend(e.target.value)}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="form-box form-box-amenities">
                        <div className="form-text">
                            <h4>Select the <span className="text">amenities</span> for this res</h4>
                            <p>Keep in mind: Answer accurately as we assign amenities to residences based on your inputs here</p>
                        </div>
                        <div className="amenities-section">
                            {/* <div className="amenity" data-amenty="bathroom">
                                <p>Private Bathroom</p>
                                <WcIcon fontSize="large" />
                            </div>
                            <div className="amenity" style={{backgroundColor: "var(--green)"}} data-amenty="dining">
                                <p>Dining Hall</p>
                                <FastfoodIcon fontSize="large" />
                            </div>
                            <div className="amenity" style={{backgroundColor: "var(--green)"}} data-amenty="wifi">
                                <p>Wifi</p>
                                <WifiIcon fontSize="large" />
                            </div>
                            <div className="amenity" data-amenty="laundry">
                                <p>Laundry</p>
                                <LocalLaundryServiceIcon fontSize="large" />
                            </div>
                            <div className="amenity" data-amenty="kitchen">
                                <p>Kitchen</p>
                                <KitchenIcon fontSize="large" />
                            </div>
                            <div className="amenity" data-amenty="studentarea">
                                <p>Student Area</p>
                                <WeekendIcon fontSize="large" />
                            </div>
                            <div className="amenity" data-amenty="elevator">
                                <p>Elevator</p>
                                <ElevatorIcon fontSize="large" />
                            </div>
                            <div className="amenity" data-amenty="gym">
                                <p>Gym</p>
                                <RunCircleIcon fontSize="large" />
                            </div>
                            <div className="amenity" style={{backgroundColor: "var(--green)"}} data-amenty="mailroom">
                                <p>Mailing Facilities</p>
                                <EmailIcon fontSize="large" />
                            </div> */}

                            {
                                amenitiesList.map(el => {
                                    const {data, text, icon, active } = el

                                    return (
                                        <div 
                                            key={data} 
                                            className={`amenity ${active && `amenity-active`}`} 
                                            onClick={() => addAmenity(data)}
                                        >
                                            <p>{text}</p>
                                            {icon}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="form-box form-box-comment">
                        <div className="form-text">
                            <h4>Write a <span className="text">comment</span></h4>
                            <p>Let others know what to expect</p>
                        </div>
                        <div className="comment-container">
                            <TextField fullWidth multiline inputProps={{maxLength: 300}} rows={5} variant="outlined" color="secondary" placeholder="Minimum of 5 characters, maximum of 300" 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submitting */}
                    <div className="form-box form-box-comment">
                        <div className="form-text" style={{marginBottom: "2rem"}}>
                            <h5 style={{fontWeight: 500}}>On submitting your form will be sent for reviewing</h5>
                        </div>
                        {
                            isValid ? 
                            <button className="btn-main" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button> :
                            <button className="btn-disabled" onClick={(e) => e.preventDefault()}>Provide Correct Information</button>
                        }
                    </div>
                </form>
            </div>
        </>
    ) 
}

export default AddDorm
