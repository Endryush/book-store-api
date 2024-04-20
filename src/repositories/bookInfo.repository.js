import { connect, close } from "../config/mongo.db.js";
import BookInfoSchema from "../schema/bookInfo.schema.js";
import mongoose from "mongoose";

async function createBookInfo (bookInfo) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);
    bookInfo = new BookInfo(bookInfo)
    await bookInfo.save(bookInfo)

    return 
  } catch (error) {
    throw error
  }  finally {
    await close()
  }
}

async function updateBookInfo (bookInfo) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);
    return await BookInfo.findOneAndUpdate({ bookId: bookInfo.bookId}, bookInfo)
  } catch (error) {
    throw error
  } finally {
    await close()
  }
}

async function getBookInfo (bookId) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);

    return await BookInfo.findOne({ bookId }).select('-_id -__v').lean().exec()
  } catch (error) {
    throw error
  } finally {
    await close()
  }
}

async function getAllBookInfo () {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);
    return await BookInfo.find().select('-_id -__v').lean().exec()
  } catch (error) {
    throw error
  } finally {
    await close()
  }
}

async function deleteBookInfo (bookId) {
  try {
    const mongoose = await connect()
    const BookInfo = mongoose.model('BookInfo', BookInfoSchema);

    return await BookInfo.deleteOne({ bookId }).exec()
  } catch (error) {
    throw error
  } finally {
    await close()
  }
}


async function createReview (review, bookId) {
  try {
    const bookInfo = await getBookInfo(bookId)
    bookInfo.reviews.push(review)
    return await updateBookInfo(bookInfo)
  } catch (error) {
    throw error
  } finally {
    await close()
  }
}

async function deleteReview (bookId, id) {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const objectId = new ObjectId(id)

    const bookInfo = await getBookInfo(bookId)
    bookInfo.reviews = bookInfo.reviews.filter(review => !review._id.equals(objectId))

    return await updateBookInfo(bookInfo)
  } catch (error) {
    throw error
  } finally {
    await close()
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