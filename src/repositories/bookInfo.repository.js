import { connect } from "../config/mongo.db.js";
import BookInfoSchema from "../schema/bookInfo.schema.js";
 
async function createBookInfo (bookInfo) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);
    bookInfo = new BookInfo(bookInfo)
    await bookInfo.save(bookInfo)

    return 
  } catch (error) {
    throw error
  } 
}

async function updateBookInfo (bookInfo) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);
    return await BookInfo.findOneAndUpdate({ bookId: bookInfo.bookId}, bookInfo)
  } catch (error) {
    throw error
  }
}

async function getBookInfo (bookId) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);

    return await BookInfo.findOne({ bookId }).exec()
  } catch (error) {
    throw error
  }
}

async function getAllBookInfo () {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);
    return await BookInfo.find().exec()
  } catch (error) {
    throw error
  }
}

async function createReview (review, bookId) {
  try {
    const bookInfo = await getBookInfo(bookId)
    bookInfo.reviews.push(review)
    return await updateBookInfo(bookInfo)
  } catch (error) {
    throw error
  }
}

async function deleteReview (bookId, id) {
  try {
    const bookInfo = await getBookInfo(bookId)
    bookInfo.reviews.splice(id, 1)

    return await updateBookInfo(bookInfo)
  } catch (error) {
    throw error
  }
}

async function deleteBookInfo (bookId) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);

    return BookInfo.deleteOne({ bookId }).exec()
  } catch (error) {
    throw error
  }
}

export default {
  createBookInfo,
  updateBookInfo,
  getBookInfo,
  createReview,
  deleteReview,
  getAllBookInfo,
  deleteBookInfo
}