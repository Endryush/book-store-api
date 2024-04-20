import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    title: String,
    client: String,
    description: String,
    rating: Number,
  }, { collection: 'bookInfo' }
)

export default ReviewSchema