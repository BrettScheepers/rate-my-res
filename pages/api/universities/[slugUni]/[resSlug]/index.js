import { pool } from '../../../../../database/db'
import Cors from 'cors'

// Cors Middleware
const cors = Cors({
    methods: ['GET', 'POST'],
    origin: ['https://www.ratemyres.co.za/', 'http://localhost:3000']
  })
  
  // Helper method to wait for a middleware to execute before continuing
  // And to throw an error when an error happens in a middleware
  function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    if (req.method === 'POST') {
        const { roomRating, buildingRating, bathroomRating, locationRating, classYear, calenderYear, roomType, recommend, amenities, comment, dateCreated, resSlug } = req.body
        const isReviewed = false

        try {


            pool.query('INSERT INTO reviews(res_slug, room_rating, building_rating, bathroom_rating, location_rating, class_year, calender_year, room_type, recommend, amenities, comment, is_reviewed, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
            [resSlug, roomRating, buildingRating, bathroomRating, locationRating, classYear, calenderYear, roomType, recommend, amenities, comment, isReviewed, dateCreated], (error, result) => {
              res.status(200).json({ msg: 'Successful' });
            })
          } catch {
            res.status(500).json({ msg: "Error" })
          }
    }

    if (req.method === 'GET') {
        const { resSlug } = req.query
        // console.log(req.params)
        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            const residenceResponse = await client.query(
                'select * from residences where res_slug = $1 and is_reviewed = true',
                [resSlug]
            )
            const residence = residenceResponse.rows[0]

            const reviewsResponse = await client.query(
                'select * from reviews where res_slug = $1 and is_reviewed = true',
                [resSlug]
            )
            const reviews = reviewsResponse.rows

            await client.query('COMMIT')
            // console.log({residence, reviews})
            res.status(200).json({ residence, reviews })
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
            res.status(500).json({ msg: 'Unsuccessful' })
        } finally {
            client.release()
        }
    }

}