import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { burgersService } from "../services/BurgersService.js";


export class BurgersController extends BaseController{
  constructor(){
    super()
    this.router
    .get('', this.getAllBurgers)
    .get('/:burgerId', this.getBurgerById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createBurger)
    .delete('/:burgerId', this.deleteBurgerById)
  }
  async createBurger(req, res, next) {
    try {
      const user = req.user
      const burgerData = req.body
      burgerData.creatorId = user.id
      const burger = await burgersService.createBurger(burgerData)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  async getAllBurgers(req, res, next){
    try {
      const burgers = await burgersService.getAllBurgers()
      res.send(burgers)
    } catch (error) {
      next(error)
    }
  }

  async getBurgerById(req, res, next){
    try {
      const burgerId = req.params.burgerId
      const burger = await burgersService.getBurgerById(burgerId)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }

  async deleteBurgerById(req, res, next){
    try {
      const user = req.user
      const burgerId = req.params.burgerId
      const burger = await burgersService.deleteBurgerById(burgerId, user.id)
      res.send(burger)
    } catch (error) {
      next(error)
    }
  }
}