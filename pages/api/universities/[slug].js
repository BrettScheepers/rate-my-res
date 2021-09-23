import { pool } from '../../../database/db'

export default async function handler(req, res) {
  try {
    await pool.query('SELECT * FROM universities WHERE uni_slug = $1', [req.query.slug], (error, result) => {
      res.status(200).json(result.rows[0]);
    })
  } catch {
    res.status(500).json({ msg: "Error" })
  }
}