import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";


class FriesService{
  async getAllFries(){
    let fries = await dbContext.Fries.find()
    return fries
  }

  async getFriesById(friesId){
    let fries = await dbContext.Fries.findById(friesId)
    return fries
  }

  async createFries(friesData){
    let fries = await dbContext.Fries.create(friesData)
    return fries
  }

  async deleteFriesById(friesId, userId){
    let fries = await this.getFriesById(friesId)
    if(fries.creatorId != userId){
      throw new Forbidden("That's not your fries order to delete!")
    }
    await fries.remove()
    return `Successfully deleted the fries order at id ${fries.id}!`
  }
}

export const friesService = new FriesService();