import { dbContext } from "../db/DbContext.js";


class BurgersService{
  async createBurger(burgerData) {
    let burger = await dbContext.Burgers.create(burgerData)
    return burger
  }

}

export const burgersService = new BurgersService();