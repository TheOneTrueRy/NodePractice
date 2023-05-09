import { dbContext } from "../db/DbContext.js";


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

}

export const burgersService = new BurgersService();