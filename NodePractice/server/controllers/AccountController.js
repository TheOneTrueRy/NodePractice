import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { burgersService } from "../services/BurgersService.js"
import { drinksService } from "../services/DrinksService.js"
import { friesService } from "../services/FriesService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/burgers', this.getMyBurgers)
      .get('/drinks', this.getMyDrinks)
      .get('/fries', this.getMyFries)
      .get('/order', this.getMyOrder)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyBurgers(req, res, next){
    try {
      const user = req.user
      const burgers = burgersService.getMyBurgers(user.id)
      res.send(burgers)
    } catch (error) {
      next(error)
    }
  }
  
  async getMyDrinks(req, res, next){
    try {
      const user = req.user
      const drinks = drinksService.getMyDrinks(user.id)
      res.send(drinks)
    } catch (error) {
      next(error)
    }
  }

  async getMyFries(req, res, next){
    try {
      const user = req.user
      const fries = friesService.getMyFries(user.id)
      res.send(fries)
    } catch (error) {
      next(error)
    }
  }

  async getMyOrder(req, res, next){
    try {
      const user = req.user
      const order = accountService.getMyOrder(user.id)
      res.send(order)
    } catch (error) {
      next(error)
    }
  }
}
