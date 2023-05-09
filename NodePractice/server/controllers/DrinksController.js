import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { drinksService } from "../services/DrinksService.js";


export class DrinksController extends BaseController{
  constructor(){
    super()
    this.router
    .get('', this.getAllDrinks)
    .get('/:drinkId', this.getDrinkById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createDrink)
  }

  async getAllDrinks(req, res, next){
    try {
      const drinks = drinksService.getAllDrinks()
      res.send(drinks)
    } catch (error) {
      next(error)
    }
  }

  async getDrinkById(req, res, next){
    try {
      const drinkId = req.params.drinkId
      const drink = drinksService.getDrinkById(drinkId)
      res.send(drink)
    } catch (error) {
      next(error)
    }
  }

  async createDrink(req, res, next){
    try {
      const user = req.user
      const drinkData = req.body
      drinkData.creatorId = user.id
      const drink = drinksService.createDrink(drinkData)
      res.send(drink)
    } catch (error) {
      next(error)
    }
  }
}