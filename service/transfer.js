const { ObjectId } = require("mongodb")
const StandardError = require("../constant/standard-error")


const createTransferRequest = async ({ db, ...request }) => {
  try {
    const transferRequest = {
      ...request,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    const res = await db.collection("transfer").insertOne(transferRequest)
    
    return res
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
  
}

const getAllTransferRequest = async ({db, query}) => {
  try {
    const filter = {
      deletedAt: null
    }
   
    if (query && query.startDate && query.endDate) {
      let endDateFormat = new Date(query.endDate)
      endDateFormat.setHours(23, 59, 59, 999)
      
      filter.createdAt = {
        $gte: new Date(query.startDate),
        $lte: endDateFormat
      }
    }
    if (query && query.statuses) {
      filter.status = { $in: query.statuses }
    }
    
    const transferRequests = await db.collection("transfer").find(filter).project({deletedAt: 0}).toArray()
    return transferRequests
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}

const updateTransferRequest = async ({ db, id, status }) => {
  try {
    const res = await db.collection('transfer').updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } })
    if (res.modifiedCount === 0) {
      throw new StandardError({ message: "Transfer request not found", status: 404 })
    }
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}

const deleteTransferRequest = async ({ db, id }) => {
  try {
    const res = await db.collection('transfer').updateOne({ _id: new ObjectId(id) }, { $set: { deletedAt: new Date(), updatedAt: new Date() } })
    if (res.modifiedCount === 0) {
      throw new StandardError({ message: "Transfer request not found", status: 404 })
    }
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}

module.exports = {
  createTransferRequest,
  getAllTransferRequest,
  updateTransferRequest,
  deleteTransferRequest
}