import { pool } from '../../../../database/db'
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

  if (req.method === "POST") {
    const { roomRating, buildingRating, bathroomRating, locationRating, classYear, calenderYear, roomType, recommend, amenities, comment, dateCreated, slugUni } = req.body
    const isReviewed = false
    let {resName} = req.body
    // console.log(req.body)
    // console.log(resName)
    
    const resSlug = resName
      .toLowerCase()
      .split(' ')
      .join('-')

    resName = resSlug
      .split('-')
      .map((el) => {
        return el.charAt(0).toUpperCase() + el.substring(1)
      })
      .join(' ')

    // console.log(resSlug, resName)

    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      // Res Query
      // resSlug, resName, isReviewed, dateCreated
      const resResponse = await client.query(
        'INSERT INTO residences(res_slug, res_name, uni_slug, is_reviewed, date_created) select $1,$2,$3,$4,$5 WHERE EXISTS(SELECT * FROM universities WHERE uni_slug = $6)',
        [resSlug, resName, slugUni, isReviewed, dateCreated, slugUni]
      )

      // Review Query
      const reviewResponse = await client.query(
        'INSERT INTO reviews(res_slug, room_rating, building_rating, bathroom_rating, location_rating, class_year, calender_year, room_type, recommend, amenities, comment, is_reviewed, date_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        [resSlug, roomRating, buildingRating, bathroomRating, locationRating, classYear, calenderYear, roomType, recommend, amenities, comment, isReviewed, dateCreated]
      )

      await client.query('COMMIT')
      res.status(200).json({ msg: 'Successful' })
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
      res.status(500).json({ msg: 'Unsuccessful' })
    } finally {
      client.release()
    }

  } else {
    try {
      await pool.query('SELECT * FROM universities WHERE uni_slug = $1', [req.query.slugUni], (error, result) => {
        res.status(200).json(result.rows[0]);
      })
    } catch {
      res.status(500).json({ msg: "Error" })
    }
  }
}