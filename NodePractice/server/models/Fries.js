import { Schema } from "mongoose";


export const Fries = new Schema(
  {
    creatorId: {type: Schema.Types.ObjectId, required: true},
    type: {type: String, required: true},
    size: {type: String, required: true, enum: ['Small', 'Medium', 'Large', 'Super Size']},
    checkedOut: {type: Boolean, default: false}
  }
)