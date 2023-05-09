import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class BurgersService{
  async createBurger(burgerData) {
    let burger = await dbContext.Burgers.create(burgerData)
    return burger
  }

  async getAllBurgers(){
    let burgers = await dbContext.Burgers.find()
    return burgers
  }

  async getBurgerById(burgerId){
    let burger = await dbContext.Burgers.findById(burgerId)
    return burger
  }

  async deleteBurgerById(burgerId, userId){
    let burger = await this.getBurgerById(burgerId)
    if(burger.creatorId != userId){
      throw new Forbidden("That's not your burger order to delete!")
    }
    await burger.remove()
    return `Burger order at id ${burger.id} successfully deleted!`
  }

}

export const burgersService = new BurgersService();