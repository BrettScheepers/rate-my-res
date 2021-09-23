import { pool } from '../../../database/db'

export default async function handler(req, res) {
  try {
    pool.query('SELECT * FROM universities', (error, result) => {
      res.status(200).json(result.rows);
    })
  } catch {
    res.status(500).json({ msg: "Error" })
  }
}
