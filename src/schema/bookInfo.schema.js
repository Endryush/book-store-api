import mongoose from "mongoose";
import ReviewSchema from './review.schema.js'

const BookInfoSchema = new mongoose.Schema(
  {
    bookId: { type: Number, unique: true },
    category: String,
    pages: Number,
    description: String,
    author: String,
    reviews: [ReviewSchema]
  }, { collection: 'bookInfo' }  
)

export default BookInfoSchema