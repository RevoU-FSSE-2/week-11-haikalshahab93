const { loginUser, registerUser,users } = require('../service/auth.js')

const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body
    const { db } = req
    await registerUser({ db, username, password, role })
    res.status(201).json({ message: "User registered" })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const { db } = req
    const token = await loginUser({ db, username, password })
    res.json({ message: "User logged in", token })
  } catch (error) {
    next(error)
  }
}

const userAllProduct = async (req, res, next) => {
  try {
    const { db } = req
    const userRequests = await users({ db })
    res.status(200).json({ data: userRequests })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  userAllProduct
}