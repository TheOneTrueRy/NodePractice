import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BurgerSchema } from "../models/Burger.js";
import { DrinkSchema } from "../models/Drink.js";
import { FriesSchema } from "../models/Fries.js";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Burgers = mongoose.model('Burger', BurgerSchema);
  Drinks = mongoose.model('Drink', DrinkSchema);
  Fries = mongoose.model('Fries', FriesSchema);
}

export const dbContext = new DbContext()
