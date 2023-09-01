
const { MongoClient } = require("mongodb");
require('dotenv').config();

const DB_URI = process.env.ENV === 'production' ? process.env.MONGO_PROD : process.env.MONGO_URI 
const connectToDb = async () => {
  try {
    const client = await new MongoClient(DB_URI).connect();
    const db = client.db(process.env.MONGO_DB);
    console.log(db)
    console.log(`Connection Success`);
    return db
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;