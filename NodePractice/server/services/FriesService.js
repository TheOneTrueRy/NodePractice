import { dbContext } from "../db/DbContext.js";


class FriesService{
  async getAllFries(){
    let fries = await dbContext.Fries.find()
    return fries
  }

  async getFriesById(friesId){
    let fries = await dbContext.Fries.findById(friesId)
    return fries
  }
}

export const friesService = new FriesService();