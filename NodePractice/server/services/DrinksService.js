import { dbContext } from "../db/DbContext.js";


class DrinksService{
  async getAllDrinks(){
    let drinks = dbContext.Drinks.find()
    return drinks
  }

  async getDrinkById(drinkId){
    let drink = dbContext.Drinks.findById(drinkId)
    return drink
  }
}

export const drinksService = new DrinksService();