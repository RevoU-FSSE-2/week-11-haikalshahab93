const { createProductRequest, getAllProductRequest, updateProductRequest, deleteProductRequest,jualBeliRequest } = require("../service/product")

const createProduct = async (req, res, next) => {
  try {
    const { db, body } = req
    const response = await createProductRequest({ db, ...body })
    res.status(201).json({ message: "Product request created", data: response })
  } catch (error) {
    next(error)
  }
}

const getAllProduct = async (req, res, next) => {
  try {
    const { db } = req
    const productRequests = await getAllProductRequest({ db })
    res.status(200).json({ data: productRequests })
  } catch (error) {
    next(error)
  }
}

const getProductHistory = async (req, res, next) => {
  try {
    const { db, query } = req
    const productRequests = await getAllProductRequest({ db, query })
    res.status(200).json({ data: productRequests })
  } catch (error) {
    next(error)
  }
}

const updateProductStatus = async (req, res, next) => {
  try {
    const { db, params, body } = req
    await updateProductRequest({ db, id: params.id, ...body })
    res.status(200).json({ message: "Product request updated" })
  } catch (error) {
    next(error)
  }
}

const jualBeliProductStatus = async (req, res, next) => {
  try {
    const { db, params, body } = req
    await jualBeliRequest({ db, id: params.id, ...body })
    res.status(200).json({ message: "Product request updated" })
  } catch (error) {
    next(error)
  }
}
const deleteProduct = async (req, res, next) => {
  try {
    const { db, params } = req
    await deleteProductRequest({ db, id: params.id })
    res.status(200).json({ message: "Product request deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProduct,
  getAllProduct,
  updateProductStatus,
  deleteProduct,
  getProductHistory,
  jualBeliProductStatus
}