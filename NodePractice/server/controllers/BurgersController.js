import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { burgersService } from "../services/BurgersService.js";


export class BurgersController extends BaseController{
  constructor(){
    super()
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createBurger)
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
}