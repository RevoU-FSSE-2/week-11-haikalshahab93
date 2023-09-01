const { ObjectId } = require("mongodb")
const StandardError = require("../constant/standard-error")


const createProductRequest = async ({ db, ...request }) => {
  try {
    const productRequest = {
      ...request,
      status: "nonaktif",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    const res = await db.collection("product").insertOne(productRequest)

    return res
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }

}

const getAllProductRequest = async ({ db, query }) => {
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

    const productRequests = await db.collection("product").find(filter).project({ deletedAt: 0 }).toArray()
    return productRequests
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}

const updateProductRequest = async ({ db, id, status }) => {
  try {
    const res = await db.collection('product').updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } })
    if (res.modifiedCount === 0) {
      throw new StandardError({ message: "Product request not found", status: 404 })
    }
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}

const deleteProductRequest = async ({ db, id }) => {
  try {
    const res = await db.collection('product').updateOne({ _id: new ObjectId(id) }, { $set: { deletedAt: new Date(), updatedAt: new Date() } })
    if (res.modifiedCount === 0) {
      throw new StandardError({ message: "Product request not found", status: 404 })
    }
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}

const jualBeliRequest = async ({ db, id, status, jumlah }) => {
  const productsCollection = db.collection("product"); // product
  const transactionsCollection = db.collection("transactions"); // transaksi
  try {
    const product = await productsCollection.findOne({ _id: new ObjectId(id) })

    if (product) {
      // Hitung total harga
      const totalPrice = product.price * jumlah;

      // Membuat data transaksi
      const transaction = {
        product_id: new ObjectId(id),
        quantity: jumlah,
        totalPrice: totalPrice,
        createdAt: new Date(),
      };

      try {
        
        // Update stok produk jual / beli
        if (status === 'beli') {
         const res =  await productsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { stock: +jumlah } }
          );

          if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Product request not found", status: 404 })
          }
        }
        else {
          if(product.stock < jumlah){
            throw new StandardError({ message: "Product Not Enough Stock", status: 500 })
          }
          const res = await productsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { stock: -jumlah } }
          );
          if (res.modifiedCount === 0) {
            throw new StandardError({ message: "Product request not found", status: 404 })
          }
        }

        // Simpan data transaksi
        await transactionsCollection.insertOne(transaction);
        console.log(`Transaksi berhasil. Harga total: ${totalPrice}`);
      } catch (error) {
        throw new StandardError({ message: error.message, status: 500 })
      }
    } else {
      console.log(`Produk ${new ObjectId(id)} tidak ditemukan`);
    }
  } catch (error) {
    throw new StandardError({ message: error.message, status: 500 })
  }
}


module.exports = {
  createProductRequest,
  getAllProductRequest,
  updateProductRequest,
  deleteProductRequest,
  jualBeliRequest
}
