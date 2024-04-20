import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    client: String,
    description: String,
    rating: Number,
  }, { collection: 'bookInfo' }
)

export default ReviewSchema