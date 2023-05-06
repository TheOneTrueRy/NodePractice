import { Schema } from "mongoose";


export const BurgerSchema = new Schema(
  {
    creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    buns: {type: Number, required: true},
    patties: {type: Number, required: true},
    cheeseSlices: {type: Number, default: 0},
    pickles: {type: Boolean, default: false},
    onions: {type: Boolean, default: true},
    ketchup: {type: Boolean, default: true},
    specialRequest: {type: String, maxLength: 300},
    checkedOut: {type: Boolean, default: false}
  },
  {timestamps: true, toJSOn: {virtuals: true}}
)