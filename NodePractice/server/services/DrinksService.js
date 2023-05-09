import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";


class DrinksService{
  async getAllDrinks(){
    let drinks = await dbContext.Drinks.find()
    return drinks
  }

  async getMyDrinks(userId){
    let drinks = await dbContext.Drinks.find({creatorId: userId})
    return drinks
  }

  async getMyOrderedDrinks(userId){
    let drinks = await dbContext.Drinks.find({creatorId: userId, checkedOut: false})
    return drinks
  }

  async getDrinkById(drinkId){
    let drink = await dbContext.Drinks.findById(drinkId)
    return drink
  }

  async createDrink(drinkData){
    let drink = await dbContext.Drinks.create(drinkData)
    return drink
  }

  async deleteDrinkById(drinkId, userId){
    let drink = await this.getDrinkById(drinkId)
    if(drink.creatorId != userId){
      throw new Forbidden("That's not your drink order to delete!")
    }
    await drink.remove()
    return `Successfully deleted the drink order at id ${drink.id}!`
  }
}

export const drinksService = new DrinksService();