import express from 'express'
import getPool from '../utils/db'

const testingRouter = express.Router()

testingRouter.post('/reset', async (_req, res) => {
  if (process.env.NODE_ENV === 'test') {
    const db = getPool()
    // empty the database
    await db.sync({ force: true })
    return res.status(200).json({ message: 'Mission accomplished!' })
  } else {
    // don't empty if the testing env variable isn't active
    return res.status(400).json({ error: 'Nice try!' })
  }
})

export default testingRouter