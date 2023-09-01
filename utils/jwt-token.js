const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  })
  return token
}

module.exports = generateToken