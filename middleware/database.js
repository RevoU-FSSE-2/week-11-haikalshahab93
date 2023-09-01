const connectToDb = require("../database")

const databaseMiddleware = async (req, res, next) => {
  const db = await connectToDb()
  req.db = db
  next()
}

module.exports = databaseMiddleware